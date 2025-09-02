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
     console.log("Intentando login con:", email);
     console.log("int password", password);
     

    try {
        const admin = await getAdminByEmail(email);
        console.log(admin);
        
        if (!admin) {
            return res.status(404).json({ error: 'Admin no encontrado' });
        }
        const isValid = await bcrypt.compare(password, admin.password_hash);
        console.log(isValid);
        
        if (!isValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ admin_id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ admin_id: admin.id, email: admin.email}, process.env.JWT_SECRET_REFRESHTOKEN, { expiresIn: '7d'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 6 * 60 * 60 * 1000 // 6 horas
        });
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        const {password_hash, ...admin_data } = admin
        res.status(200).json({ message: 'Login exitoso', admin_data });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};


export const refresh = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ error: "No hay refresh token" });
    }

    try {
        // verificamos el refresh
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESHTOKEN);

        // generamos un nuevo access token válido por 1h
        const newToken = jwt.sign(
            { admin_id: decoded.admin_id, email: decoded.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // lo mandamos como cookie nueva
        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 60 * 60 * 1000 // 1 hora
        });

        return res.status(200).json({ message: "Token renovado" });
    } catch (error) {
        return res.status(403).json({ error: "Refresh token inválido o expirado" });
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
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 *60 * 1000
        })
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
