import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/auth.route.js';
import clientesRouter from './routes/clientes.route.js';
import planesRouter from './routes/planes.route.js';
import adminRouter from './routes/admin.route.js';



const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/planes', planesRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${process.env.PORT || 3000}`);
});
