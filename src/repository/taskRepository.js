class TaskRepository {
    constructor() {
    this.tasks = [];
    }

    save(task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index >= 0) {
        this.tasks[index] = task;
    } else {
        this.tasks.push(task);
    }
    return task;
    }

    findAll(status) {
    if (status) {
        return this.tasks.filter(t => t.status === status);
    }
    return [...this.tasks];
    }

    findById(id) {
    return this.tasks.find(t => t.id === id);
    }

    delete(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index >= 0) {
        this.tasks.splice(index, 1);
    }
    }

    findOverdue(today) {
    return this.tasks.filter(t => {
        return t.dueDate && t.status !== "DONE" && new Date(t.dueDate) < today;
    });
    }
}

module.exports = { TaskRepository };