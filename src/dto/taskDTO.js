function toTaskResponseDTO(task) {
    return {
    id: task.id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
    status: task.status
    };
}

module.exports = { toTaskResponseDTO };

