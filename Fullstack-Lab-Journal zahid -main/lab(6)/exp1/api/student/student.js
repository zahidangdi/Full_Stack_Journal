const Express = require("express");
const router = Express.Router();
const fs = require("fs");

router.use(Express.json());

router.get("/getStudent", (req, res) => {
    res.send("student added");
})

router.post("/save", (req, res) => {
    const { name, rollno } = req.body;
    const saveText = `Name : ${name} ,Rollno : ${rollno}\n`;

    fs.appendFile("okk.txt", saveText, (err) => {
        console.log(err);
    })
    res.send("success");
});

router.get("/", (req, res) => {
    res.send("student");
})

module.exports = router;