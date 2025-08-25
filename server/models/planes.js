import pool from "../db.js";

const getAllPlans = async (admin_id) => {
    const result = await pool.query("SELECT * FROM planes WHERE admin_id = $1", [admin_id]);
    return result.rows;  
};

const getPlanById = async (id, admin_id) => {
    const result = await pool.query("SELECT * FROM planes WHERE id = $1 AND admin_id = $2", [id, admin_id]);
    return result.rows[0];
};

const getPlanByClientes = async (id) => {
    const result = await pool.query("SELECT * FROM clientes WHERE plan_id = $1", [id]);
    return result.rows;
};

const createPlan = async (nombre, precio, duracion, descripcion, admin_id) => {
    const result = await pool.query(
        "INSERT INTO planes (nombre, precio, duracion, descripcion, admin_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [nombre, precio, duracion, descripcion, admin_id]
    );
    return result.rows[0];  
};

const deletePlan = async (id, admin_id) => {
    const result = await pool.query("DELETE FROM planes WHERE id = $1 AND admin_id = $2", [id, admin_id]);
    return result.rowCount > 0;  // true si borró algo
};

const updatePlan = async (id, data, admin_id) => {
    const { nombre, precio, duracion, descripcion } = data;
    const result = await pool.query(
        "UPDATE planes SET nombre = $1, precio = $2, duracion = $3, descripcion = $4 WHERE id = $5 AND admin_id = $6",
        [nombre, precio, duracion, descripcion, id, admin_id]
    );
    return result.rowCount > 0;  // true si actualizó algo
};

export { getAllPlans, createPlan, deletePlan, updatePlan, getPlanById, getPlanByClientes };
