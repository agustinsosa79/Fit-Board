import { authenticateToken } from "../middlewares/auth.middleware.js";
import { deleteAdminById, getAdminById, getAllAdmins } from "../controllers/admin.controller.js";
import { Router } from "express";

const router = Router();


router.use(authenticateToken); // Apply authentication middleware to all routes in this router

router.get('/', getAllAdmins);
router.delete('/:id', deleteAdminById);
router.get('/:id', getAdminById);

export default router; 