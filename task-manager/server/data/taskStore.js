const fs = require("fs"); // fs = file system , built into Node
const path = require("path"); // path help build file path correctly

const filePath = path.join(__dirname, "tasks.json");

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]");
}

function readTasks() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

module.exports = { readTasks, writeTasks };
