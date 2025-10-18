const { randomUUID } = require("crypto");

let tasks = []; // almacenamiento en memoria

const TaskStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE"
};

function createTask(data) {
  if (!data || !data.title || data.title.trim() === "") {
    throw new Error("Title is required");
  }
  const newTask = {
    id: randomUUID(),
    title: data.title,
    description: data.description || "",
    dueDate: data.dueDate ? new Date(data.dueDate) : null,
    status: TaskStatus.PENDING
  };
  tasks.push(newTask);
  return newTask;
}

function getAllTasks(status) {
  if (status) {
    return tasks.filter(t => t.status === status);
  }
  return [...tasks];
}

function findById(id) {
  return tasks.find(t => t.id === id);
}

function updateTaskStatus(id, status) {
  const task = findById(id);
  if (!task) return null;
  if (!Object.values(TaskStatus).includes(status)) {
    throw new Error("Invalid status");
  }
  task.status = status;
  return task;
}

function deleteTask(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

function getOverdueTasks(now = new Date()) {
  return tasks.filter(t => t.dueDate && t.status !== TaskStatus.DONE && new Date(t.dueDate) < now);
}

module.exports = {
  createTask,
  getAllTasks,
  updateTaskStatus,
  deleteTask,
  getOverdueTasks,
  TaskStatus
};
