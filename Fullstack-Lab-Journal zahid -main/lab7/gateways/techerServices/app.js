const Express = require("express");

const app = new Express();
const PORT = 3001;

app.get("/", (req, res) => {
    console.log(req.header);
    res.send("server 2")
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})