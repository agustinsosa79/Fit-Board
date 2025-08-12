import pool from "../db.js";


const agregarDuracion = async () => {
    try {
        await pool.query(`
            ALTER TABLE planes
            ADD COLUMN duracion INT
        `);
        console.log('Columna de duración agregada correctamente');
    } catch (error) {
        console.error('Error al agregar columna de duración:', error);
    }
};

agregarDuracion();