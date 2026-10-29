const express = require("express");
const router = express.Router();
const { Course, Attendance, student: Student } = require("../models");

// 1. Create a new course
router.post("/", async (req, res) => {
  try {
    const { courseCode, courseName, credits } = req.body;

    if (!courseCode || !courseName) {
      return res.status(400).json({
        success: false,
        message: "courseCode and courseName are required"
      });
    }

    // Check if courseCode already exists
    const existingCourse = await Course.findOne({ where: { courseCode } });
    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: `Course with code ${courseCode} already exists`
      });
    }

    const newCourse = await Course.create({
      courseCode,
      courseName,
      credits: credits ? parseInt(credits, 10) : 3
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating course",
      error: error.message
    });
  }
});

// 2. Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: Attendance,
          as: "attendances",
          required: false
        }
      ],
      order: [["id", "ASC"]]
    });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message
    });
  }
});

// 3. Get course by ID with attendance records and student details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const courseRecord = await Course.findByPk(id, {
      include: [
        {
          model: Attendance,
          as: "attendances",
          include: [
            {
              model: Student,
              as: "student",
              attributes: ["id", "rollNumber", "name", "email", "department"]
            }
          ]
        }
      ]
    });

    if (!courseRecord) {
      return res.status(404).json({
        success: false,
        message: `Course with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: courseRecord
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching course details",
      error: error.message
    });
  }
});

// 4. Update course details
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { courseCode, courseName, credits } = req.body;

    const courseRecord = await Course.findByPk(id);
    if (!courseRecord) {
      return res.status(404).json({
        success: false,
        message: `Course with ID ${id} not found`
      });
    }

    await courseRecord.update({
      courseCode: courseCode !== undefined ? courseCode : courseRecord.courseCode,
      courseName: courseName !== undefined ? courseName : courseRecord.courseName,
      credits: credits !== undefined ? parseInt(credits, 10) : courseRecord.credits
    });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: courseRecord
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating course",
      error: error.message
    });
  }
});

// 5. Delete course
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const courseRecord = await Course.findByPk(id);

    if (!courseRecord) {
      return res.status(404).json({
        success: false,
        message: `Course with ID ${id} not found`
      });
    }

    // Delete associated attendance records first
    await Attendance.destroy({ where: { courseId: id } });

    await courseRecord.destroy();

    return res.status(200).json({
      success: true,
      message: `Course with ID ${id} and associated attendance records deleted successfully`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: error.message
    });
  }
});

module.exports = router;
