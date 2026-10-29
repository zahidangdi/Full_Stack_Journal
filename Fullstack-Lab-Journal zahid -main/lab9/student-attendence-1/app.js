require("dotenv").config();
const express = require("express");
const db = require("./models");

const studentRouter = require("./router/student");
const courseRouter = require("./router/course");
const attendanceRouter = require("./router/attendence");
const enrollmentRouter = require("./router/enrollment");


const app = express();
const PORT = process.env.PORT || 4000;

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint: API Overview & Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Student Attendance Management System API",
    status: "active",
    endpoints: {
      students: {
        "POST /student": "Create student (body: rollNumber, name, email, department, semester)",
        "GET /student": "List all students (query: department, semester)",
        "GET /student/:id": "Get student details with attendance history",
        "PUT /student/:id": "Update student details",
        "DELETE /student/:id": "Delete student"
      },
      courses: {
        "POST /course": "Create course (body: courseCode, courseName, credits)",
        "GET /course": "List all courses",
        "GET /course/:id": "Get course details with attendance history",
        "PUT /course/:id": "Update course details",
        "DELETE /course/:id": "Delete course"
      },
      attendance: {
        "POST /attendance": "Mark attendance (body: studentId, courseId, date, status: Present|Absent|Late)",
        "GET /attendance": "Query attendance records (query: studentId, courseId, date, status)",
        "GET /attendance/:id": "Get single attendance record",
        "GET /attendance/student/:studentId": "Get attendance percentage and statistics for a student",
        "GET /attendance/course/:courseId": "Get attendance report for a course",
        "PUT /attendance/:id": "Update attendance record",
        "DELETE /attendance/:id": "Delete attendance record"
      },
      enrollment: {
        "POST /enrollment": "Enroll student in a course (body: studentId, courseId)",
        "GET /enrollment": "List all enrollments (query: studentId, courseId)",
        "GET /enrollment/:id": "Get single enrollment record",
        "GET /enrollment/student/:studentId": "Get enrollments for a student",
        "GET /enrollment/course/:courseId": "Get enrollments for a course",
        "PUT /enrollment/:id": "Update enrollment record",
        "DELETE /enrollment/:id": "Delete enrollment record"
      }
    }
  });
});

// Mount Routes
app.use("/student", studentRouter);
app.use("/students", studentRouter);
app.use("/api/student", studentRouter);
app.use("/api/students", studentRouter);

app.use("/course", courseRouter);
app.use("/courses", courseRouter);
app.use("/api/course", courseRouter);
app.use("/api/courses", courseRouter);

app.use("/attendance", attendanceRouter);
app.use("/api/attendance", attendanceRouter);

app.use("/enrollment", enrollmentRouter);
app.use("/enrollments", enrollmentRouter);
app.use("/api/enrollment", enrollmentRouter);
app.use("/api/enrollments", enrollmentRouter);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.url}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
});

// Start Server and optionally verify DB connection
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.warn("Database connection warning (ensure MySQL is running):", error.message);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();

module.exports = app;