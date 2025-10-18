const { randomUUID } = require("crypto");

const TaskStatus = {
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    DONE: "DONE"
};

class Task {
    constructor(title, description, dueDate) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.status = TaskStatus.PENDING;
    }
}

module.exports = { Task, TaskStatus };
