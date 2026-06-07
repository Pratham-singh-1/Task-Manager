const express = require("express");
const { randomUUID } = require("crypto");
const { readTasks, writeTasks } = require("../data/taskStore");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const tasks = readTasks();
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch tasks" });
  }
});

router.post("/", (req, res) => {
  console.log("POST hit, body:", req.body);
  try {
    const { title, description, dueDate } = req.body;

    if (!title || title.trim() == "") {
      return res.status(400).json({ error: "Title is Required" });
    }

    const newTasks = {
      id: randomUUID(),
      title: title.trim(),
      description: description || "",
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const tasks = readTasks();
    tasks.push(newTasks);
    writeTasks(tasks);

    res.status(201).json(newTasks);
  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({ error: "Failed to create Task" });
  }
});

// PATCH /api/tasks/reorder — save new task order
router.patch("/reorder", (req, res) => {
  try {
    const { orderedIds } = req.body;
    // orderedIds = ["id3", "id1", "id2"] — the new order

    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: "orderedIds must be an array" });
    }

    const tasks = readTasks();

    // Sort tasks to match the new order
    const reordered = orderedIds
      .map((id) => tasks.find((t) => t.id === id))
      .filter(Boolean); // remove any undefined

    writeTasks(reordered);
    res.json(reordered);
  } catch (error) {
    res.status(500).json({ error: "Failed to reorder tasks" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const tasks = readTasks();
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (filteredTasks.length === tasks.length) {
      return res.status(404).json({ error: "Task not Found" });
    }

    writeTasks(filteredTasks);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params; // :id from the URL

    console.log("PUT hit, id:", id);
    console.log("PUT hit, body:", req.body);

    const { title, description, dueDate, completed } = req.body;

    const tasks = readTasks();

    // Find the task by id
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
      // 404 = Not Found
    }

    //  Update only the fields that were sent
    // The spread (...) keeps existing fields, then overrides changed ones
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: title ?? tasks[taskIndex].title,
      description: description ?? tasks[taskIndex].description,
      dueDate: dueDate ?? tasks[taskIndex].dueDate,
      completed: completed ?? tasks[taskIndex].completed,
    };

    writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

module.exports = router;
