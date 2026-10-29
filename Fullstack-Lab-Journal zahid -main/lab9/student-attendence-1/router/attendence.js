const express = require("express");
const router = express.Router();
const { Attendance, student: Student, Course } = require("../models");

// 1. Mark / Create Attendance Record
router.post("/", async (req, res) => {
  try {
    const { studentId, courseId, date, status } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "studentId and courseId are required"
      });
    }

    // Verify student exists
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }

    // Verify course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course with ID ${courseId} not found`
      });
    }

    const attendanceRecord = await Attendance.create({
      studentId: parseInt(studentId, 10),
      courseId: parseInt(courseId, 10),
      date: date ? new Date(date) : new Date(),
      status: status || "Present"
    });

    const populatedRecord = await Attendance.findByPk(attendanceRecord.id, {
      include: [
        { model: Student, as: "student", attributes: ["id", "rollNumber", "name", "email"] },
        { model: Course, as: "course", attributes: ["id", "courseCode", "courseName"] }
      ]
    });

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: populatedRecord
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error marking attendance",
      error: error.message
    });
  }
});

// 2. Get all attendance records (with optional query filters)
router.get("/", async (req, res) => {
  try {
    const { studentId, courseId, date, status } = req.query;
    const filter = {};

    if (studentId) filter.studentId = parseInt(studentId, 10);
    if (courseId) filter.courseId = parseInt(courseId, 10);
    if (status) filter.status = status;
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      const { Op } = require("sequelize");
      filter.date = {
        [Op.gte]: searchDate,
        [Op.lt]: nextDay
      };
    }

    const records = await Attendance.findAll({
      where: filter,
      include: [
        {
          model: Student,
          as: "student",
          attributes: ["id", "rollNumber", "name", "email", "department", "semester"]
        },
        {
          model: Course,
          as: "course",
          attributes: ["id", "courseCode", "courseName", "credits"]
        }
      ],
      order: [["date", "DESC"], ["id", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching attendance records",
      error: error.message
    });
  }
});

// 3. Get Student Attendance Statistics / Percentage
router.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }

    const records = await Attendance.findAll({
      where: { studentId },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id", "courseCode", "courseName"]
        }
      ],
      order: [["date", "DESC"]]
    });

    const total = records.length;
    const presentCount = records.filter(r => r.status && r.status.toLowerCase() === "present").length;
    const absentCount = records.filter(r => r.status && r.status.toLowerCase() === "absent").length;
    const lateCount = records.filter(r => r.status && r.status.toLowerCase() === "late").length;
    const attendancePercentage = total > 0 ? ((presentCount / total) * 100).toFixed(2) : "0.00";

    return res.status(200).json({
      success: true,
      data: {
        student: {
          id: student.id,
          rollNumber: student.rollNumber,
          name: student.name,
          department: student.department
        },
        statistics: {
          totalClasses: total,
          present: presentCount,
          absent: absentCount,
          late: lateCount,
          percentage: `${attendancePercentage}%`
        },
        history: records
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error calculating student attendance",
      error: error.message
    });
  }
});

// 4. Get Course Attendance Report
router.get("/course/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course with ID ${courseId} not found`
      });
    }

    const records = await Attendance.findAll({
      where: { courseId },
      include: [
        {
          model: Student,
          as: "student",
          attributes: ["id", "rollNumber", "name", "email", "department"]
        }
      ],
      order: [["date", "DESC"]]
    });

    const total = records.length;
    const presentCount = records.filter(r => r.status && r.status.toLowerCase() === "present").length;
    const absentCount = records.filter(r => r.status && r.status.toLowerCase() === "absent").length;

    return res.status(200).json({
      success: true,
      data: {
        course: {
          id: course.id,
          courseCode: course.courseCode,
          courseName: course.courseName
        },
        statistics: {
          totalRecords: total,
          totalPresent: presentCount,
          totalAbsent: absentCount
        },
        records
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error generating course attendance report",
      error: error.message
    });
  }
});

// 5. Get single attendance record by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Attendance.findByPk(id, {
      include: [
        { model: Student, as: "student" },
        { model: Course, as: "course" }
      ]
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: `Attendance record with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching attendance record",
      error: error.message
    });
  }
});

// 6. Update attendance record
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, date, studentId, courseId } = req.body;

    const record = await Attendance.findByPk(id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: `Attendance record with ID ${id} not found`
      });
    }

    await record.update({
      status: status !== undefined ? status : record.status,
      date: date !== undefined ? new Date(date) : record.date,
      studentId: studentId !== undefined ? parseInt(studentId, 10) : record.studentId,
      courseId: courseId !== undefined ? parseInt(courseId, 10) : record.courseId
    });

    const updatedRecord = await Attendance.findByPk(id, {
      include: [
        { model: Student, as: "student" },
        { model: Course, as: "course" }
      ]
    });

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: updatedRecord
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating attendance record",
      error: error.message
    });
  }
});

// 7. Delete attendance record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Attendance.findByPk(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: `Attendance record with ID ${id} not found`
      });
    }

    await record.destroy();

    return res.status(200).json({
      success: true,
      message: `Attendance record with ID ${id} deleted successfully`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting attendance record",
      error: error.message
    });
  }
});

module.exports = router;