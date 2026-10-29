const eventEmitter = require("events");
const EventEmitter = new eventEmitter;

let lightState1 = { state: 0 };
let lightState2 = { state: 0 };
let lightState3 = { state: 0 };
let lightState4 = { state: 0 };

let fanState1 = { state: 0 };
let fanState2 = { state: 0 };
let fanState3 = { state: 0 };
let fanState4 = { state: 0 };
let fanState5 = { state: 0 };
let fanState6 = { state: 0 };

let ACState1 = { state: 0 };
let ACState2 = { state: 0 };

// let lightState = [lightState1, lightState2, lightState3, lightState4, fanState1,fanState2,fanState3,fanState4,fanState5,fanState6,ACState1,ACState2]

EventEmitter.on("turnOn", (lightstate) => {
    if (!lightstate.state) {
        lightstate.state = 1
    }
    else {
        console.log("light in alresdy ON")

    }
})

EventEmitter.on("turnOff", (lightstate) => {
    if (lightstate.state) {
        lightstate.state = 0
    }
    else {
        console.log("light in alresdy OFF")
    }
})


EventEmitter.on("checkLightState", (light) => {
    console.log("light is ", (light.state ? "turned ON" : "turned OFF"), light.state)
})



EventEmitter.emit("turnOn", lightState1);
EventEmitter.emit("checkLightState", lightState2);
EventEmitter.emit("turnOn", lightState3);
EventEmitter.emit("turnOn", lightState4);





EventEmitter.emit("checkLightState", lightState1);
EventEmitter.emit("checkLightState", lightState2);
EventEmitter.emit("checkLightState", lightState3);
EventEmitter.emit("checkLightState", lightState4);
EventEmitter.emit("checkLightState", fanState1);
EventEmitter.emit("checkLightState", fanState2);
EventEmitter.emit("checkLightState", fanState3);
EventEmitter.emit("checkLightState", fanState4);
EventEmitter.emit("checkLightState", fanState5);
EventEmitter.emit("checkLightState", fanState6);
EventEmitter.emit("checkLightState", ACState1);
EventEmitter.emit("checkLightState", ACState2);