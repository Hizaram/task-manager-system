// controllers/taskController.js
import Task from '../models/Task';
import AppError from '../helpers/AppError';
import formatResponse from '../helpers/formatResponse';

class TaskController {
  //Fetch all tasks
  static async getAllTasks(req, res, next) {
    try {
        const tasks = await Task.find();
        const data = tasks.map((task) => formatResponse(task));

        return res.status(200).json({
            results: tasks.length,
            tasks: data,
        });
    } catch (err) {
          return next(err);
      }
}

  //Fetch a task
  static async getTask(req, res, next) {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
           return next(new AppError('Task with this ID does not exist', 404));
      }

      return res.status(200).json({ task: formatResponse(task) });
    } catch (err) {
        return next(err);
    }
  }
  
  //Create a new task
  static async createTask(req, res) {
  
    const { name, description } = req.body;
    try {
      const newTask = new Task({ name, description });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  //Update a task
  static async updateTask(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, { name, description }, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  //delete task
  static async deleteTask(req, res, next) {
    try {
        const { taskid } = req.headers;
        if (!taskid) {
            return next(new AppError('Forbidden', 403));
        }
        const task = await Task.findByIdAndDelete(taskid);

        if (!task) {
            return next(new AppError('Task with this ID does not exist', 404));
        }

        return res.status(204).end({ status: 'success' });
    } catch (err) {
          return next(err);
      }
}
}


export default TaskController;
