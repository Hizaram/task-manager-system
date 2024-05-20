// routers/tasks.js
import { Router } from 'express';
const router = Router();
import taskController from '../controllers/taskController';

// Fetch Tasks
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTask);

// Create Task
router.post('/', taskController.createTask);

// Update Task
router.put('/:id', taskController.updateTask);

// Delete Task
router.delete('/:id', taskController.deleteTask);


export default router;
