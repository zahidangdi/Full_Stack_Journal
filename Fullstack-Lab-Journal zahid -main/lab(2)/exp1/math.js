
const calculatesimpleIntrest = (initialAmount, intersrate, numberofYears) => {
    const intersoninitalAmount = (initialAmount * intersrate) / numberofYears;

    const totalAmount = initialAmount + (intersoninitalAmount * numberofYears);

    return (totalAmount * intersrate) / numberofYears;


}
const calculatethecompoudintrest = (initialAmount, intersrate, numberofYears) => {
    return initialAmount * ((1 + intersrate / 100) ** (numberofYears));
}
module.exports = {
    calculatesimpleIntrest,
    calculatethecompoudintrest
}