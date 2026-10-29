const express = require("express")

const app = new express()
app.get("/getStudent", (req, res) => {
  res.send("student added");
})


module.exports = app;
