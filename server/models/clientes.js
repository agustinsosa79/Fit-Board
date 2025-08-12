import pool from "../db.js";


export const getAllClients = async (admin_id) => {
    const result = await pool.query('SELECT * FROM clientes WHERE admin_id = $1', [admin_id]);
    return result.rows;
};


export const createClient = async (nombre, email, admin_id, estado = 'activo', plan_id, dni, telefono, direccion, edad) => {
    const result = await pool.query(
        'INSERT INTO clientes (nombre, email, admin_id, estado, plan_id, dni, telefono, direccion, edad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [nombre, email, admin_id, estado, plan_id, dni, telefono, direccion, edad]
    );
    return result.rows[0];
};


export const deleteClient = async (id, admin_id) => {
    const result = await pool.query(
        'DELETE FROM clientes WHERE id = $1 AND admin_id = $2 RETURNING *',
        [id, admin_id]
    );
    return result.rows[0];
};

export const getClientId = async (id, admin_id) => {
    const result = await pool.query(
        'SELECT * FROM clientes WHERE id = $1 AND admin_id = $2',
        [id, admin_id]
    );
    return result.rows[0];
};


export const updateClient = async (id, {nombre, email, estado, plan_id, dni, telefono, direccion, edad}, admin_id) => {
    const result = await pool.query(
        `UPDATE clientes SET
            nombre = $1,
            email = $2,
            estado = $3,
            plan_id = $4,
            dni = $5,
            telefono = $6,
            direccion = $7,
            edad = $8
        WHERE id = $9 AND admin_id = $10
        RETURNING *`,
        [nombre, email, estado, plan_id, dni, telefono, direccion, edad, id, admin_id]
    );
    return result.rows[0];
};