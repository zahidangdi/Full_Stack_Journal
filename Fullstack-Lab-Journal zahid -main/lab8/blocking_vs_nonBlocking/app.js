const fs = require('fs');

console.log("1. Start reading file...");


const data = fs.readFileSync('example.txt', 'utf8');
console.log("2. File Content:\n", data);


console.log("3. Finished process.");


console.log("1. Start reading file...");

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("2. File Content:\n", data);
});

console.log("3. Finished process.");