import { createTask, deleteTask, getTaskById, getTasks, updateTask, getDashboardTasks} from "../Controller/taskController.js";


export const taskRoutes = (app) => {
    app.post('/task', createTask);
    app.get('/task', getTasks);
    app.post('/dashboard', getDashboardTasks);
    app.get('/task/:id', getTaskById);
    app.put('/task/:id', updateTask);
    app.delete('/task/:id', deleteTask);
};