//module
const fs = require("fs");

const readStream = fs.createReadStream("./read.txt", { encoding: "utf-8", highWaterMark: 20 });
readStream.on("data", (chunk) => {
    console.log("\nchunk===>\n", chunk);
})

// readStream.on("error", (err) => {
//     console.log(err);
// })

readStream.on("close", () => {
    console.log("done");
})