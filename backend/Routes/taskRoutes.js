import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../Controller/taskController.js";


export const taskRoutes = (app) => {
    app.post('/', createTask);
    app.get('/', getTasks);
    app.get('/:id', getTaskById);
    app.put('/:id', updateTask);
    app.delete('/:id', deleteTask);
};