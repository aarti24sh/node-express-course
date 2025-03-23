const { createReadStream } = require("fs");

const stream = createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 500, 
});

let chunkCount = 0;

stream.on("data", (chunk) => {
  chunkCount++;
  console.log(`Received chunk ${chunkCount}:`, chunk);
});

stream.on("end", () => {
  console.log(`Stream ended. Total chunks received: ${chunkCount}`);
});

stream.on("error", (error) => {
  console.error("An error occurred:", error);
});