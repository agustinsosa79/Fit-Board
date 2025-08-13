import { authenticateToken } from "../middlewares/auth.middleware.js";
import { deleteAdminById, getAdminById, getAllAdmins } from "../controllers/admin.controller.js";
import { Router } from "express";

const router = Router();



router.get('/', (req, res) => {
    const key = req.headers['admin-secret-key'];
    console.log("ADMIN_SECRET_KEY =", process.env.ADMIN_SECRET_KEY);
    if( key !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ error: 'Acceso denegado' });
    }
    getAllAdmins(req, res)
});


router.delete('/:id', (req, res) => {
    const key = req.headers['admin-secret-key'];
    if( key !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ error: 'Acceso denegado' });
    }
    deleteAdminById(req, res);
});

router.get('/:id', (req, res) => {
    const key = req.headers['admin-secret-key'];
    if( key !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ error: 'Acceso denegado' });
    }
    getAdminById(req, res);
});

export default router; 