function TaskSummary({ tasks }) {
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="task-summary">
      <span>{active} active</span>
      <span>{completed} completed</span>
    </div>
  );
}

export default TaskSummary;
