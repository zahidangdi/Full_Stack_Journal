const express = require("express");
const { Student, Course, Attendance } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const attendanceRecords = await Attendance.findAll({
			order: [["date", "DESC"]]
		});

		const result = await Promise.all(
			attendanceRecords.map(async (attendance) => ({
				id: attendance.id,
				date: attendance.date,
				status: attendance.status,
				student: await Student.findByPk(attendance.studentId),
				course: await Course.findByPk(attendance.courseId)
			}))
		);

		res.json(result);
	} catch (error) {
		res.status(500).json({
			message: "Error getting attendance",
			error: error.message
		});
	}
});

router.post("/", async (req, res) => {
	try {
		const { studentId, courseId, date, status } = req.body;

		if (!studentId || !courseId || !status) {
			return res.status(400).json({
				message: "studentId, courseId and status are required"
			});
		}

		const student = await Student.findByPk(studentId);
		const course = await Course.findByPk(courseId);

		if (!student) {
			return res.status(404).json({ message: "Student not found" });
		}

		if (!course) {
			return res.status(404).json({ message: "Course not found" });
		}

		const attendance = await Attendance.create({
			studentId,
			courseId,
			date: date || new Date(),
			status
		});

		res.status(201).json({
			message: "Attendance saved successfully",
			attendance
		});
	} catch (error) {
		res.status(500).json({
			message: "Error saving attendance",
			error: error.message
		});
	}
});

module.exports = router;
