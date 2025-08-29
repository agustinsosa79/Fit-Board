interface Cliente {
    id: string;
    nombre: string;
    edad: string;
    email: string;
    dni: string;
    telefono: string;
    direccion: string;
    estado: string;
    plan_id: string | null;
    creado_en: string;
    vence: string | null
}




export type { Cliente };