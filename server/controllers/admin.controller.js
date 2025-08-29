import { deleteAdmin, allAdmin, AdminById } from "../models/admin.js";



export const deleteAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteAdmin(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Admin no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar admin:', error);
        res.status(500).json({ error: 'Error al eliminar admin' });
    }
};

export const getAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await AdminById(id);
        if (admin) {
            res.json(admin);
        } else {
            res.status(404).json({ error: 'Admin no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener admin:', error);
        res.status(500).json({ error: 'Error al obtener admin' });
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await allAdmin();
        res.json(admins);
    } catch (error) {
        console.error('Error al obtener todos los admins:', error);
        res.status(500).json({ error: 'Error al obtener todos los admins' });
    }
};




