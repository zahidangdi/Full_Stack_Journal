const express = require("express");
const { sequelize, Student, Course, Attendance } = require("./models");
const attendanceRoutes = require("./routers/attendanceRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/attendance", attendanceRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Attendance API is running" });
});

// GET attendance details for one student
app.get("/students/:studentId/attendance", async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const attendanceRecords = await Attendance.findAll({
      where: {
        studentId: studentId
      },
      order: [["date", "DESC"]]
    });

    const attendanceDetails = await Promise.all(
      attendanceRecords.map(async (attendance) => {
        const course = await Course.findByPk(attendance.courseId);

        return {
          attendanceId: attendance.id,
          date: attendance.date,
          status: attendance.status,
          course: course
        };
      })
    );

    res.json({
      student: student,
      attendance: attendanceDetails
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting student attendance",
      error: error.message
    });
  }
});

// Create a student from Postman
app.post("/students", async (req, res) => {
  try {
    const student = await Student.create({
      rollNumber: req.body.rollNumber,
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
      semester: req.body.semester
    });

    res.status(201).json({
      message: "Student created successfully",
      student: student
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating student",
      error: error.message
    });
  }
});

// Create a course from Postman
app.post("/courses", async (req, res) => {
  try {
    const course = await Course.create({
      courseCode: req.body.courseCode,
      courseName: req.body.courseName,
      credits: req.body.credits
    });

    res.status(201).json({
      message: "Course created successfully",
      course: course
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating course",
      error: error.message
    });
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL database connected");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

  // Create a student from Postman
app.post("/students", async (req, res) => {
  try {
    const student = await Student.create({
      rollNumber: req.body.rollNumber,
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
      semester: req.body.semester
    });

    res.status(201).json({
      message: "Student created successfully",
      student: student
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating student",
      error: error.message
    });
  }
});

// Create a course from Postman
app.post("/courses", async (req, res) => {
  try {
    const course = await Course.create({
      courseCode: req.body.courseCode,
      courseName: req.body.courseName,
      credits: req.body.credits
    });

    res.status(201).json({
      message: "Course created successfully",
      course: course
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating course",
      error: error.message
    });
  }
});