const Express = require("express");
const router = Express.Router();
const fs = require("fs");

router.use(Express.json());

router.get("/getTeacher", (req, res) => {
    res.send("teacher info");
})

router.post("/save", (req, res) => {
    const { name, id } = req.body;
    const saveText = `Name : ${name} ,id : ${id}\n`;

    fs.appendFile("teacher.txt", saveText, (err) => {
        console.log(err);
    })
    res.send("success");
});

router.get("/", (req, res) => {
    res.send("teacher");
})

module.exports = router;