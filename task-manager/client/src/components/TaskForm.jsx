import { useState, useEffect } from "react";

function TaskForm({ onSubmit, onCancel, initialData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  //  pre-fill the form with existing data
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setDueDate(initialData.dueDate || "");
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, dueDate });
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div className="form-buttons">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          {initialData ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
