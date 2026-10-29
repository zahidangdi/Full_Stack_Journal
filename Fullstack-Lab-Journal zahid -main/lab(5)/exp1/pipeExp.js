const fs = require("fs");

const readStream = fs.createReadStream("./read.txt");
const writeStream = fs.createWriteStream("./pipe.txt");

readStream.pipe(writeStream);
