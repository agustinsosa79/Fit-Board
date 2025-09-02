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
  'https://fit-board-wqjq-git-master-agustinsosa79s-projects.vercel.app',
  'https://fit-board-wqjq-h40q6n43o-agustinsosa79s-projects.vercel.app'
];



const app = express();
app.use(cookieParser());

app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // Postman, curl
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE']
}));

app.use(express.json());


console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);


app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/planes', planesRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${process.env.PORT || 3000}`);
});
