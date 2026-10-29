const fs = require("fs");

// const write = fs.createWriteStream("./write.txt");

// console.log("type a sentance");
process.stdin.pipe(fs.createWriteStream("./write.txt"))

// process.stdin.on("data", (typed) => {
//     write.write(typed.toString());
// })