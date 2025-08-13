import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { getClients, getClientById, postClient, deleteClientById, updateClientById } from '../controllers/clientes.controller.js';


const router = Router();

router.use(authenticateToken); // Apply authentication middleware to all routes in this router

router.get('/', getClients);
router.get('/:id', getClientById);
router.post('/', postClient);
router.delete('/:id', deleteClientById);
router.put('/:id', updateClientById);

export default router; 