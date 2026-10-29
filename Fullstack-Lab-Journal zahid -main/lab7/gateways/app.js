const Express = require("express");

const app = new Express();
const PORT = 3000;

app.get("/", (req, res) => {
    console.log(req.headers);
    res.send("server 1")
})



app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})