import express from "express";
import { newTask , getMyTask,updateTask,deleteTask} from "../controllers/tasks.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/new",isAuthenticated,newTask);
router.get("/my",isAuthenticated,getMyTask);
router.route("/:id").put(updateTask).delete(deleteTask);


export default router;