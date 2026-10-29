const express = require("express");
const router = express.Router();
const { student: Student, Attendance, Course } = require("../models");

// 1. Create a new student
router.post("/", async (req, res) => {
  try {
    const { rollNumber, name, email, department, semester } = req.body;

    if (!rollNumber || !name) {
      return res.status(400).json({
        success: false,
        message: "rollNumber and name are required"
      });
    }

    // Check if student with rollNumber already exists
    const existingStudent = await Student.findOne({ where: { rollNumber } });
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: `Student with roll number ${rollNumber} already exists`
      });
    }

    const newStudent = await Student.create({
      rollNumber,
      name,
      email,
      department,
      semester: semester ? parseInt(semester, 10) : null
    });

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: newStudent
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating student",
      error: error.message
    });
  }
});

// 2. Get all students (with optional filtering by department/semester)
router.get("/", async (req, res) => {
  try {
    const { department, semester } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (semester) filter.semester = parseInt(semester, 10);

    const students = await Student.findAll({
      where: filter,
      include: [
        {
          model: Attendance,
          as: "attendances",
          required: false,
          include: [
            {
              model: Course,
              as: "course",
              attributes: ["id", "courseCode", "courseName"]
            }
          ]
        }
      ],
      order: [["id", "ASC"]]
    });

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching students",
      error: error.message
    });
  }
});

// 3. Get single student by ID with attendance details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const studentRecord = await Student.findByPk(id, {
      include: [
        {
          model: Attendance,
          as: "attendances",
          include: [
            {
              model: Course,
              as: "course",
              attributes: ["id", "courseCode", "courseName", "credits"]
            }
          ]
        }
      ]
    });

    if (!studentRecord) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: studentRecord
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching student details",
      error: error.message
    });
  }
});

// 4. Update student details
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rollNumber, name, email, department, semester } = req.body;

    const studentRecord = await Student.findByPk(id);
    if (!studentRecord) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`
      });
    }

    await studentRecord.update({
      rollNumber: rollNumber !== undefined ? rollNumber : studentRecord.rollNumber,
      name: name !== undefined ? name : studentRecord.name,
      email: email !== undefined ? email : studentRecord.email,
      department: department !== undefined ? department : studentRecord.department,
      semester: semester !== undefined ? parseInt(semester, 10) : studentRecord.semester
    });

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: studentRecord
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating student",
      error: error.message
    });
  }
});

// 5. Delete student record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const studentRecord = await Student.findByPk(id);

    if (!studentRecord) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`
      });
    }

    // Delete associated attendance records first
    await Attendance.destroy({ where: { studentId: id } });

    await studentRecord.destroy();

    return res.status(200).json({
      success: true,
      message: `Student with ID ${id} and associated attendance records deleted successfully`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting student",
      error: error.message
    });
  }
});

module.exports = router;
