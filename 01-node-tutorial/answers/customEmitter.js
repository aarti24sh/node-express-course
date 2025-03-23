const EventEmitter = require("events");
const emitter = new EventEmitter();


emitter.on("message", (user, msg) => {
  console.log(`Message from ${user}: ${msg}`);
});


emitter.on("timer", (msg) => {
  console.log("Timer event received:", msg);
});

emitter.on("start", () => {
  console.log("Start event triggered, emitting 'process'");
  emitter.emit("process", "Processing data...");
});

emitter.on("process", (msg) => {
  console.log(msg);
});

emitter.emit("message", "Aarti", "Hello, everyone!");

emitter.emit("start");

let count = 0;
const interval = setInterval(() => {
  emitter.emit("timer", "Tick tock...");
  count++;
  if (count >= 5) {
    clearInterval(interval); // Stops the interval after 5 times
    console.log("Timer event stopped.");
  }
}, 2000);

