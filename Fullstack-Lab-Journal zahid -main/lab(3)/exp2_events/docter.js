const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

let doctor = { state: 1 };
let appointment = { state: 1 };


eventEmitter.on("bookAppointment", (appointmentState) => {
    if (!appointmentState.state) {
        appointmentState.state = 1;
        console.log("Appointment is booked.");
    } else {
        console.log("Appointment is already booked.");
    }
});

eventEmitter.on("checkAppointment", (appointmentState) => {
    console.log("Appointment is ", (appointmentState.state ? "booked" : "not booked"),appointmentState.state);
});

eventEmitter.on("checkDoctor", (doctorState) => {
    console.log("Doctor is ", (doctorState.state ? "available" : "not available"),doctorState.state);
});

eventEmitter.on("patientCheckup", (doc, appt) => {
    if (appt.state === 1 && doc.state === 1) {
        console.log("The patient should go and get the checkup!");
    } else {
        console.log("Cannot get checkup:");
        if (appt.state !== 1) {
            console.log(" - Appointment is not booked.");
        }
        if (doc.state !== 1) {
            console.log(" - Doctor is not available.");
        }
    }
});


eventEmitter.emit("checkAppointment", appointment);
eventEmitter.emit("checkDoctor", doctor);
eventEmitter.emit("patientCheckup", doctor, appointment);