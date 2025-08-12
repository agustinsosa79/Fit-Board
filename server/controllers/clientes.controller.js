import { getAllClients, createClient, deleteClient, updateClient, getClientId } from "../models/clientes.js";


export const getClients = async (req, res) => {
    try {
        const { admin_id } = req.user;
        const clients = await getAllClients(admin_id);
        res.json(clients);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
};

export const postClient = async (req, res) => {
    const { nombre, email, estado, plan_id, dni, telefono, direccion, edad } = req.body;
    const { admin_id } = req.user;
    try {
        const newClient = await createClient(nombre, email, admin_id, estado, plan_id, dni, telefono, direccion, edad);
        res.status(201).json(newClient);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ error: 'Error al crear cliente' });
    }
};

export const deleteClientById = async (req, res) => {
    const { id } = req.params;
    const { admin_id } = req.user;
    try {
        const deletedClient = await deleteClient(id, admin_id);
        if (!deletedClient) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(deletedClient);
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
};


export const getClientById = async (req, res) => {
    const { id } = req.params;
    const {admin_id} = req.user
    try {
        const client = await getClientId(id, admin_id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(client);
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        res.status(500).json({ error: 'Error al obtener cliente' });
    }
};

export const updateClientById = async (req, res) => {
    const {id} = req.params;
    const {nombre, email, estado, plan_id, dni, telefono, direccion, edad} = req.body;
    const {admin_id} = req.user;
    try {
        const updateClientId = await updateClient(id, {nombre, email, estado, plan_id, dni, telefono, direccion, edad}, admin_id);
        if (!updateClientId) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(updateClientId);
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ error: 'Error al actualizar cliente' });
    }
}