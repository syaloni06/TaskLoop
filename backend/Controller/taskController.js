import taskModel from "../Model/task.js";
import mongoose from "mongoose";

// Function to create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignedTo, createdBy } = req.body;

    if (!Array.isArray(assignedTo)) {
      return res.status(400).json({ message: "assignedTo must be an array of user IDs" });
    }

    const task = new taskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      createdBy,
    });

    await task.save(); // Save the new task
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// Function to get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find().populate("createdBy assignedTo", "name email");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get dashboard-related tasks
export const getDashboardTasks = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const now = new Date();

    const [createdTasks, assignedTasks, overdueTasks] = await Promise.all([
      taskModel.find({ createdBy: userId }),
      taskModel.find({ assignedTo: userId }),
      taskModel.find({
        assignedTo: userId,
        dueDate: { $lt: now },
        status: { $ne: 'Completed' }, // fixed status case sensitivity
      }),
    ]);

    res.status(200).json({
      created: createdTasks,
      assigned: assignedTasks,
      overdue: overdueTasks,
    });
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Function to get a task by its ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findById(id).populate("createdBy assignedTo", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.assignedTo && !Array.isArray(updates.assignedTo)) {
      return res.status(400).json({ message: "assignedTo must be an array of user IDs" });
    }

    const task = await taskModel.findByIdAndUpdate(id, updates, { new: true });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
