
import { Router } from "express";
import { getPlanes, getPlan, updateExistingPlan, deleteExistingPlan, createNewPlan } from "../controllers/planes.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticateToken); // Apply authentication middleware to all routes in this router

router.get("/", getPlanes);
router.get("/:id", getPlan);
router.post("/", createNewPlan);
router.put("/:id", updateExistingPlan);
router.delete("/:id", deleteExistingPlan);

export default router;

