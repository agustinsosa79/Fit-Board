import { registerAdmin, loginAdmin, logoutAdmin, getCurrentAdmin, refresh } from "../controllers/auth.controller.js";
import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.post('/refresh', refresh)
router.get('/me', authenticateToken, getCurrentAdmin);


export default router;