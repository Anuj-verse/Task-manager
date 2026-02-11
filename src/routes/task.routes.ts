import { Router } from "express"

import { createTaskHandler,getTaskHandler,updateTaskHandler } from "../controllers/task.controllers.js"
import { validate } from "../middlewares/validate.js";
import { createTaskSchema,updateTaskSchema } from "../dto/task.dto.js";

const router =Router();

router.post("/",validate(createTaskSchema),createTaskHandler);
router.get("/",getTaskHandler);
router.post("/:id",validate(updateTaskSchema),updateTaskHandler);

export default router;