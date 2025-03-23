const { writeFile, readFile } = require("fs").promises;

writeFile("temp.txt", "First line.\n")
  .then(() => {
    console.log("First line written.");
    return writeFile("temp.txt", "Second line.\n", { flag: "a" });
  })
  .then(() => {
    console.log("Second line written.");
    return writeFile("temp.txt", "Third line.\n", { flag: "a" });
  })
  .then(() => {
    console.log("Third line written.");
    return readFile("temp.txt", "utf8");
  })
  .then((data) => {
    console.log("File contents:\n", data);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
