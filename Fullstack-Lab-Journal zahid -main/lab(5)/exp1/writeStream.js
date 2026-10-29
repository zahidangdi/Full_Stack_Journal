const fs = require("fs");

const writeStream = fs.createWriteStream("./write.txt");
writeStream.write("hello world\n");
writeStream.write("my name is Sample Student 1\n");
writeStream.write("my name is Sample Student 2\n");
writeStream.write("my name is Sample Student 3\n");
writeStream.write("my name is Sample Student 4\n");
writeStream.write("my name is Sample Student 5\n");
writeStream.end();