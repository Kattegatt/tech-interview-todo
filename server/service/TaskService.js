import Database from "better-sqlite3";
const db = new Database("todo.db");

class TaskService {
  async getAllTasks(user_id) {
    try {
      const tasks = db
        .prepare("SELECT * FROM tasks WHERE user_id = ?")
        .all([user_id]);
      return tasks;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createTask(user_id, text) {
    try {
      const newTask = db
        .prepare(
          "INSERT INTO tasks (user_id, text, created_date) VALUES (?, ?, strftime('%s', 'now'))"
        )
        .run([user_id, text]);
      return newTask;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async deleteTask(id) {
    try {
      const deletedTask = db
        .prepare("DELETE FROM tasks WHERE id = ?")
        .run([id]);
      return deletedTask;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateTask(id, text) {
    id = parseInt(id);
    try {
      const updatedTask = db
        .prepare("UPDATE tasks SET text = ? WHERE id = ?")
        .run([text, id]);
      return updatedTask;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new TaskService();
