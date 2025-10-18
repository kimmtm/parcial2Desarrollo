const express = require("express");
const bodyParser = require("body-parser");
const taskController = require("./controller/taskController");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("🚀 API parcial2Desarrollo - /tasks"));

app.use("/tasks", taskController);

module.exports = app;
