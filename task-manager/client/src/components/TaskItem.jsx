function TaskItem({ task, onToggle, onEdit, onDelete }) {
  // Check if task is overdue
  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  function handleDelete() {
    // Confirmation before deleting
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  }

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        {task.dueDate && (
          <span className={isOverdue ? "overdue-label" : ""}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
            {isOverdue && " — Overdue!"}
          </span>
        )}
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
