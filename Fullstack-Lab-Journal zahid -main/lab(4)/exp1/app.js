// const result = require("./studentResult");

const {
    buyProspectus,
    fillForm,
    submitForm,
    formVerification,
    answerEntranceExam,
    payment
} = require("./studentAdmission");

const admission = () => {

    // call back hell

    buyProspectus().then((res) => {
        console.log(res)
        fillForm().then((res) => {
            console.log(res)
            submitForm().then((res) => {
                console.log(res)
                formVerification().then((res) => {
                    console.log(res)
                    answerEntranceExam().then((res) => {
                        console.log(res)
                        payment().then((res) => {
                            console.log(res)
                        });
                    });
                });
            });
        });
    }).catch();


    //call back chaining

    buyProspectus().then((res) => {
        console.log(res)
        return fillForm()
    }).then((res) => {
        console.log(res)
        return submitForm()
    }).then((res) => {
        console.log(res)
        return formVerification()
    }).then((res) => {
        console.log(res)
        return answerEntranceExam()
    }).then((res) => {
        console.log(res)
        return payment()
    }).then((res) => {
        console.log(res)
        console.log("complete")
    })
}

// admission()

const fs = require("fs");
const express = require("express")


const app = express();
const PORT = 3001;
app.use(express.json());

app.get("/getStudentDetails", (req, res) => {
    res.send("hiii");
});

app.post("/saveStudentDetails", (req, res) => {
    console.log("1")
    console.log(req.body);
    const { name, rollno, classes } = req.body;

    const saveText = `Name : ${name} ,Rollno : ${rollno} , classes : ${classes}\n`;

    fs.appendFile("ok.txt", saveText, (err) => {
        console.log(err);
    })
    res.send("admission");
});


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
