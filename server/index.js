import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/auth.route.js';
import clientesRouter from './routes/clientes.route.js';
import planesRouter from './routes/planes.route.js';
import adminRouter from './routes/admin.route.js';

const allowedOrigins = [
  'http://localhost:5173',                 // local
  'https://fit-board-client.vercel.app',   // producción original
  'https://fit-board-wqjq.vercel.app',     // tu frontend actual en Vercel
  'https://fit-board-wqjq-h40q6n43o-agustinsosa79s-projects.vercel.app',
  'https://fit-board-wqjq-git-master-agustinsosa79s-projects.vercel.app/login',
  'https://fit-board-wqjq-h40q6n43o-agustinsosa79s-projects.vercel.app/login'
];



const app = express();
app.use(cookieParser());

app.use(cors({
    origin: function(origin, callback){
    if (!origin) return callback(null, true); // para requests desde Postman o curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/planes', planesRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${process.env.PORT || 3000}`);
});
