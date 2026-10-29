const checkMarks = (marks) => {
    return new Promise((resolve, reject) => {
        if (marks >= 100) {
            resolve("A+")
        }
        else if (marks >= 90) {
            resolve("A")
        }
        else if (marks >= 80) {
            resolve("B+")
        }
        else if (marks >= 70) {
            resolve("B")
        }
        else if (marks >= 60) {
            resolve("C+")
        }
        else if (marks >= 50) {
            resolve("C")
        }
        else if (marks >= 40) {
            resolve("D")
        }
        else if (marks >= 0) {
            reject("Fail")
        }
        else {
            reject("Invalid Marks")
        }
    })
}


checkMarks(7).then((result) => {
    console.log(result)
}).catch(result => {
    console.log(result)
})

module.exports = {
    checkMarks
}