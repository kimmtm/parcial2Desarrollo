const express = require("express");
const router = express.Router();

const taskService = require("../service/taskService");

// POST /tasks  -> crear tarea
router.post("/", (req, res) => {
  try {
    const created = taskService.createTask(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message || "Bad request" });
  }
});

// GET /tasks  -> listar (opcional ?status=)
router.get("/", (req, res) => {
  try {
    const status = req.query.status;
    const list = taskService.getAllTasks(status);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal error" });
  }
});

// PATCH /tasks/:id/status -> actualizar estado
router.patch("/:id/status", (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const updated = taskService.updateTaskStatus(id, status);
    if (!updated) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(updated);
  } catch (err) {
    if (err.message === "Invalid status") return res.status(400).json({ message: err.message });
    res.status(500).json({ message: err.message || "Internal error" });
  }
});

// DELETE /tasks/:id -> eliminar
router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const deleted = taskService.deleteTask(id);
    if (!deleted) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal error" });
  }
});

// GET /tasks/overdue -> vencidas (opcional)
router.get("/overdue", (req, res) => {
  try {
    const overdue = taskService.getOverdueTasks();
    res.json(overdue);
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal error" });
  }
});

module.exports = router;
