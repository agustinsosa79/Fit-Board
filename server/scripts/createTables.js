import pool from "../db.js";



const createTable = async () => {
    try {
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
        await pool.query(`CREATE TABLE IF NOT EXISTS admins(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`)

        await pool.query(`CREATE TABLE IF NOT EXISTS planes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
        nombre VARCHAR(100) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        descripcion TEXT,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`)
        
        await pool.query(`CREATE TABLE IF NOT EXISTS clientes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        estado VARCHAR(20) CHECK (estado IN ('activo', 'inactivo', 'vencido')) DEFAULT 'activo',
        plan_id UUID REFERENCES planes(id),
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`)

        console.log('Tablas creadas exitosamente');
        
    } catch (error) {
        console.error({'error al crear las tablas': error});
        
    } finally {
        await pool.end();
    }
}

createTable()