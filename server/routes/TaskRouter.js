import { Router } from "express";
import TaskController from "../controllers/TaskController.js";

const router = Router();

router.get("/", TaskController.getAllTasks);
router.post("/", TaskController.createTask);
router.delete("/:id", TaskController.deleteTask);
router.put("/:id", TaskController.updateTask);

export default router;
