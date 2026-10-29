const Express = require("express");
const router = Express.Router();

const studentRouter = require("./student/student");
const teacherRouter = require("./teacher/teacher");

router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);

module.exports = router;
