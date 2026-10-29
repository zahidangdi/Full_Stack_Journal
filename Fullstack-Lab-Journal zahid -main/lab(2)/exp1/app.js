const { calculatethecompoudintrest, calculatesimpleIntrest } = require("./math");
const express = require("express");

const app = express();
const PORT = 9000;

app.get("/simpleIntrest", (req, res) => {
    const { init, intrest, numberOfyears } = req.query;
    // console.log(init,intrest,numberOfyears)
    res.send(calculatesimpleIntrest(Number(init), Number(intrest), Number(numberOfyears)))
})

app.get("/compoundIntrest", (req, res) => {
    const { init, intrest, numberOfyears } = req.query;
    // console.log(init,intrest,numberOfyears)
    res.send("amount:   " + calculatethecompoudintrest(Number(init), Number(intrest), Number(numberOfyears)))
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})



// console.log(math.calculatethecompoudintrest(1000, 20, 12));
// console.log(math.calculatesimpleIntrest(1000, 20, 12)
// )