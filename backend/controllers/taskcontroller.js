const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
  const { task, description } = req.body;
  const owner = req.user.userId;

  try {
    const newTask = new Task({ task, description, owner });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  const owner = req.user.userId;

  try {
    const tasks = await Task.find({ owner });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.userId;

  try {
    const task = await Task.findOne({ _id: id, owner });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.userId;
  const updates = req.body;

  try {
    const task = await Task.findOneAndUpdate({ _id: id, owner }, updates, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.userId;

  try {
    const task = await Task.findOneAndDelete({ _id: id, owner });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
