import TaskService from "../service/TaskService.js";

class TaskController {
  async getAllTasks(req, res) {
    try {
      const userId = req.headers.authorization;
      const tasks = await TaskService.getAllTasks(userId);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async createTask(req, res) {
    try {
      const { text } = req.body;
      const userId = req.headers.authorization;

      const task = await TaskService.createTask(userId, text);
      console.log("created task ", task);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deletedTask = await TaskService.deleteTask(id);
      res.status(200).json(deletedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updateTask(req, res) {
    try {
      const { text } = req.body;
      const { id } = req.params;
      const updatedTask = await TaskService.updateTask(id, text);
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new TaskController();
