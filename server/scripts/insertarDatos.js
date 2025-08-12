import pool from "../db.js";

const insertarDatos = async () => {

    try {
        await pool.query(`
            ALTER TABLE clientes
            ADD COLUMN telefono VARCHAR(15),
            ADD COLUMN direccion VARCHAR(255),
            ADD COLUMN dni VARCHAR(15),
            ADD COLUMN edad INT
            `)

            console.log('Datos insertados correctamente');
            
    } catch (error) {
        console.error('Error al insertar datos:', error);
    }
}

insertarDatos();