import { AdminById, createAdmin, getAdminByEmail } from "../models/admin.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const registerAdmin = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const existingAdmin = await getAdminByEmail(email);
        if (existingAdmin) {
            return res.status(409).json({ error: 'El admin ya existe' });
        }
        const newAdmin = await createAdmin(nombre, email, password);
        res.status(201).json(newAdmin);
    } catch (error) {
        console.error('Error al registrar admin:', error);
        res.status(500).json({ error: 'Error al registrar admin' });
    }
};

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await getAdminByEmail(email);
        if (!admin) {
            return res.status(404).json({ error: 'Admin no encontrado' });
        }
        const isValid = await bcrypt.compare(password, admin.password_hash);
        if (!isValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ admin_id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 6 * 60 * 60 * 1000 // 6 horas
        });
        res.status(200).json({ message: 'Login exitoso', admin });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};


export const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 6 * 60 * 60 * 1000 // 6 horas
        });
        res.status(200).json({ message: 'Logout exitoso' });
    } catch (err) {
        res.status(500).json({ error: 'Error al cerrar sesión' });
    }
}

export const getCurrentAdmin = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'No autorizado' });
    }
    try {
        const admin = await AdminById(req.user.admin_id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin no encontrado' });
        }
        res.status(200).json({
            admin_id: admin.id,
            email: admin.email,
            nombre: admin.nombre
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener admin' });
    }
};
