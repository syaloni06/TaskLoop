import taskModel from "../Model/task.js"

// Function to create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignedTo } = req.body;

    const task = new taskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      createdBy: req.user.id,
    });

    await task.save(); // Save the new task
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server error
  }
};

// Function to get all tasks for a user
export const getTasks = async (req, res) => {
  try {
    const { search, status, priority, dueDate } = req.query;

    let query = {
      $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
    };

    if (search) {
      query.$and = [
        {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        },
      ];
    }

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (dueDate) query.dueDate = { $lte: new Date(dueDate) };

    const tasks = await taskModel.find(query).populate("createdBy assignedTo", "name email");

    res.status(200).json(tasks); // Return list of tasks
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server error
  }
};

// Function to get a task by its ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findById(id).populate("createdBy assignedTo", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" }); // Handle not found
    }

    res.status(200).json(task); // Return the found task
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server error
  }
};

// Function to update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await taskModel.findByIdAndUpdate(id, updates, { new: true });

    if (!task) {
      return res.status(404).json({ message: "Task not found" }); // Handle not found
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server error
  }
};

// Function to delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" }); // Handle not found
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server error
  }
};
