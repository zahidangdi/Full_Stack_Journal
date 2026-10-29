const buyProspectus = () => {
    return createPromise("Prospectus bought")
}

const fillForm = () => {
    return createPromise("Form filled")
}

const submitForm = () => {
    return createPromise("Form submitted")
}

const formVerification = () => {
    return createPromise("Form verified")
}

const answerEntranceExam = () => {
    return createPromise("Entrance answered")
}

const payment = () => {
    return createPromise("Payment done")
}

const createPromise = (step) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve(step), 1000)
    })
}

module.exports = {
    buyProspectus,
    fillForm,
    submitForm,
    formVerification,
    answerEntranceExam,
    payment
}