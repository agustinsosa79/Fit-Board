import { registerAdmin, loginAdmin, logoutAdmin, getCurrentAdmin } from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', getCurrentAdmin);

export default router;