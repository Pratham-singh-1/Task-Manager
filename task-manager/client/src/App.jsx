// App.jsx
import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api/tasks";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskSummary from "./components/TaskSummary";
import "./App.css";

function App() {
  // ── State ──────────────────────────────────────
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null); // null or a task object
  const [showForm, setShowForm] = useState(false);

  // ── Fetch tasks on load ─────────────────────────
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Is the server running?");
    } finally {
      setLoading(false); // runs whether success or error
    }
  }

  // ── Handlers ───────────────────────────────────
  async function handleCreate(taskData) {
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [newTask, ...prev]); // add to top of list
      setShowForm(false);
    } catch (err) {
      setError("Failed to create task");
    }
  }

  async function handleUpdate(id, updates) {
    try {
      const updated = await updateTask(id, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      setError("Failed to update task");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  }

  async function handleToggle(task) {
    await handleUpdate(task.id, { completed: !task.completed });
  }

  function handleEdit(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  // ── Filtered tasks ─────────────────────────────
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // 'all'
  });

  // ── Render ─────────────────────────────────────
  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskSummary tasks={tasks} />

      <FilterBar filter={filter} onFilterChange={setFilter} />

      <button
        onClick={() => {
          setEditingTask(null);
          setShowForm(true);
        }}
      >
        + Add Task
      </button>

      {showForm && (
        <TaskForm
          onSubmit={
            editingTask
              ? (data) => handleUpdate(editingTask.id, data)
              : handleCreate
          }
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          initialData={editingTask}
        />
      )}

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
