const express = require('express');
const router = express.Router();
const { Enrollment, student: Student, Course } = require('../models');

// Helper include options for student and course details
const includeOptions = [
  {
    model: Student,
    as: 'student',
    attributes: ['id', 'rollNumber', 'name', 'email', 'department', 'semester']
  },
  {
    model: Course,
    as: 'course',
    attributes: ['id', 'courseCode', 'courseName', 'credits']
  }
];

// 1. Create a new enrollment
router.post('/', async (req, res) => {
  try {
    const { studentId, courseId, enrollmentDate, status } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'studentId and courseId are required'
      });
    }

    // Verify student exists
    const studentExists = await Student.findByPk(studentId);
    if (!studentExists) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }

    // Verify course exists
    const courseExists = await Course.findByPk(courseId);
    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: `Course with ID ${courseId} not found`
      });
    }

    // Check if duplicate enrollment exists
    const existingEnrollment = await Enrollment.findOne({
      where: {
        studentId: parseInt(studentId, 10),
        courseId: parseInt(courseId, 10)
      }
    });

    if (existingEnrollment) {
      return res.status(409).json({
        success: false,
        message: `Student with ID ${studentId} is already enrolled in Course with ID ${courseId}`
      });
    }

    const newEnrollment = await Enrollment.create({
      studentId: parseInt(studentId, 10),
      courseId: parseInt(courseId, 10),
      enrollmentDate: enrollmentDate ? new Date(enrollmentDate) : new Date(),
      status: status || 'Active'
    });

    const populatedEnrollment = await Enrollment.findByPk(newEnrollment.id, {
      include: includeOptions
    });

    return res.status(201).json({
      success: true,
      message: 'Enrollment created successfully',
      data: populatedEnrollment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating enrollment',
      error: error.message
    });
  }
});

// 2. Get all enrollments (with optional filtering by studentId, courseId, status)
const getAllEnrollments = async (req, res) => {
  try {
    const { studentId, courseId, status } = req.query;
    const filter = {};

    if (studentId) filter.studentId = parseInt(studentId, 10);
    if (courseId) filter.courseId = parseInt(courseId, 10);
    if (status) filter.status = status;

    const enrollments = await Enrollment.findAll({
      where: filter,
      include: includeOptions,
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching enrollments',
      error: error.message
    });
  }
};

// Handle both GET / and GET /all
router.get('/', getAllEnrollments);
router.get('/all', getAllEnrollments);

// 3. Get enrollments for a specific student
router.get('/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    const studentRecord = await Student.findByPk(studentId);
    if (!studentRecord) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }

    const enrollments = await Enrollment.findAll({
      where: { studentId: parseInt(studentId, 10) },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'courseCode', 'courseName', 'credits']
        }
      ],
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      student: {
        id: studentRecord.id,
        rollNumber: studentRecord.rollNumber,
        name: studentRecord.name,
        email: studentRecord.email,
        department: studentRecord.department,
        semester: studentRecord.semester
      },
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching student enrollments',
      error: error.message
    });
  }
});

// 4. Get enrollments for a specific course
router.get('/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;

    const courseRecord = await Course.findByPk(courseId);
    if (!courseRecord) {
      return res.status(404).json({
        success: false,
        message: `Course with ID ${courseId} not found`
      });
    }

    const enrollments = await Enrollment.findAll({
      where: { courseId: parseInt(courseId, 10) },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'rollNumber', 'name', 'email', 'department', 'semester']
        }
      ],
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      course: {
        id: courseRecord.id,
        courseCode: courseRecord.courseCode,
        courseName: courseRecord.courseName,
        credits: courseRecord.credits
      },
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching course enrollments',
      error: error.message
    });
  }
});

// 5. Get single enrollment by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id, {
      include: includeOptions
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: `Enrollment with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching enrollment details',
      error: error.message
    });
  }
});

// 6. Update enrollment record
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, courseId, enrollmentDate, status } = req.body;

    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: `Enrollment with ID ${id} not found`
      });
    }

    // If updating studentId, verify that the student exists
    if (studentId) {
      const studentExists = await Student.findByPk(studentId);
      if (!studentExists) {
        return res.status(404).json({
          success: false,
          message: `Student with ID ${studentId} not found`
        });
      }
    }

    // If updating courseId, verify that the course exists
    if (courseId) {
      const courseExists = await Course.findByPk(courseId);
      if (!courseExists) {
        return res.status(404).json({
          success: false,
          message: `Course with ID ${courseId} not found`
        });
      }
    }

    // If changing studentId or courseId, check for uniqueness conflicts
    const targetStudentId = studentId ? parseInt(studentId, 10) : enrollment.studentId;
    const targetCourseId = courseId ? parseInt(courseId, 10) : enrollment.courseId;

    if (targetStudentId !== enrollment.studentId || targetCourseId !== enrollment.courseId) {
      const duplicate = await Enrollment.findOne({
        where: {
          studentId: targetStudentId,
          courseId: targetCourseId
        }
      });

      if (duplicate && duplicate.id !== enrollment.id) {
        return res.status(409).json({
          success: false,
          message: `Student with ID ${targetStudentId} is already enrolled in Course with ID ${targetCourseId}`
        });
      }
    }

    await enrollment.update({
      studentId: targetStudentId,
      courseId: targetCourseId,
      enrollmentDate: enrollmentDate ? new Date(enrollmentDate) : enrollment.enrollmentDate,
      status: status !== undefined ? status : enrollment.status
    });

    const updatedEnrollment = await Enrollment.findByPk(id, {
      include: includeOptions
    });

    return res.status(200).json({
      success: true,
      message: 'Enrollment updated successfully',
      data: updatedEnrollment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating enrollment',
      error: error.message
    });
  }
});

// 7. Delete enrollment record
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: `Enrollment with ID ${id} not found`
      });
    }

    await enrollment.destroy();

    return res.status(200).json({
      success: true,
      message: `Enrollment with ID ${id} deleted successfully`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting enrollment',
      error: error.message
    });
  }
});

module.exports = router;
