// This file is the ONLY place that knows about the backend URL
// Every component imports from here — never writes fetch() directly

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  // Change this one line when you deploy — nothing else changes
});

export const getTasks = () => api.get("/tasks").then((res) => res.data);

export const createTask = (taskData) =>
  api.post("/tasks", taskData).then((res) => res.data);

export const updateTask = (id, updates) =>
  api.put(`/tasks/${id}`, updates).then((res) => res.data);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`).then((res) => res.data);
