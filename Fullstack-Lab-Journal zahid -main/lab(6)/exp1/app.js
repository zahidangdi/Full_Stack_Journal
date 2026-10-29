const Express = require("express");
const api = require("./api/api");

const app = new Express();
const PORT = 3000;
app.use("/api", api);



app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})

app.get("/", (req, res) => {
    console.log(req.header);
    res.send("student welcome")
})


// app.post("/api/save", (req, res) => {
//     const { name, rollno } = req.body;
//     const saveText = `Name : ${name} ,Rollno : ${rollno}\n`;

//     fs.appendFile("okk.txt", saveText, (err) => {
//         console.log(err);
//     })
//     res.send("success");
// });