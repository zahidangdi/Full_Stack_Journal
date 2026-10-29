const express = require("express");
const fs = require("fs");

// const writeStream = fs.createWriteStream("./details.txt")
// const 
const app = express();
const PORT = 4000;
app.use(express.json());

app.get("/getStudentDetails", (req, res) => {
    res.json({
        name: "Sample Student",
        class: "tybca"
    });
});

app.post("/saveStudentDetails", (req, res) => {
    const { name, rollno } = req.body;
    const saveText = `Name : ${name} ,Rollno : ${rollno}\n`;

    fs.appendFile("okkk.txt", saveText, (err) => {
        console.log(err);
    })
    // process.stdin.on("data", saveText, (typed) => {
    //     writeStream.write(typed);
    // })
    // const readStream = fs.createReadStream("./okkk.txt")
    // const writeStream = fs.createWriteStream("./details.txt")


    // readStream.pipe(writeStream)
    res.send("success");
});

app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
})