import e from "express";
import { createPlan, getAllPlans, getPlanById, deletePlan, updatePlan, getPlanByClientes } from "../models/planes.js";


export const getPlanes = async (req, res) => {
    try {
        const { admin_id } = req.user;
        const planes = await getAllPlans(admin_id);
        res.json(planes);
    } catch (error) {
        console.error('Error al obtener planes:', error);
        res.status(500).json({ error: 'Error al obtener planes' });
    }
};

export const getPlan = async (req, res) => {
    const { id } = req.params;
    const { admin_id } = req.user;
    try {
        const plan = await getPlanById(id, admin_id);
        if (plan) {
            res.json(plan);
        } else {
            res.status(404).json({ error: 'Plan no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener plan:', error);
        res.status(500).json({ error: 'Error al obtener plan' });
    }
};

export const createNewPlan = async (req, res) => {
    const { nombre, precio, duracion, descripcion } = req.body;
    const { admin_id } = req.user;
    try {
        const newPlan = await createPlan(nombre, precio, duracion, descripcion, admin_id);
        res.status(201).json(newPlan);
    } catch (error) {
        console.error('Error al crear nuevo plan:', error);
        res.status(500).json({ error: 'Error al crear nuevo plan' });
    }
};

export const deleteExistingPlan = async (req, res) => {
    const { id } = req.params;
    const { admin_id } = req.user;
    try {
        const clientes = await getPlanByClientes(id);
        if (clientes.length > 0) {
            console.log('No se puede eliminar el plan porque tiene clientes asociados');
            return res.status(400).json({ error: 'No se puede eliminar el plan porque tiene clientes asociados' });
            
        } 
        
        const deleted = await deletePlan(id, admin_id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Plan no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar plan:', error);
        res.status(500).json({ error: 'Error al eliminar plan' });
    }
};


export const updateExistingPlan = async (req, res) => {
    const { id } = req.params;
    const  data  = req.body;
    const { admin_id } = req.user;
    try {
        const updatedPlan = await updatePlan(id, data, admin_id);
        if (updatedPlan) {
            res.json(updatedPlan);
        } else {
            res.status(404).json({ error: 'Plan no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar plan:', error);
        res.status(500).json({ error: 'Error al actualizar plan' });
    }
};

