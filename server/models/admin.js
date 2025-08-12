import pool from "../db.js";
import bcrypt from 'bcrypt';


export const createAdmin = async (nombre, email, password) => {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await pool.query(
        "INSERT INTO admins (nombre, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        [nombre, email, hashedPassword]
    );
    return result.rows[0];
};

export const allAdmin = async () => {
    const result = await pool.query("SELECT * FROM admins");
    return result.rows;
};

export const getAdminByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
    return result.rows[0];
};



export const AdminById = async (id) => {
    const result = await pool.query("SELECT * FROM admins WHERE id = $1", [id]);
    return result.rows[0];
};

export const deleteAdmin = async (id) => {
    const result = await pool.query("DELETE FROM admins WHERE id = $1", [id]);
    return result.rowCount > 0;
};