import { fetchClientes } from "../../services/clientesService";
import type { Cliente } from "../../types/clientes";
import { useEffect, useState } from "react";


export const ClientesActivos = () => {
const [clientesActivos, setClientesActivos] = useState<Cliente[]>([])


    useEffect(() => {
        const getClientesActivos = async () => {
            try {
                const data = await fetchClientes();
                const activos = data.filter(cliente => cliente.estado === "activo")
                setClientesActivos(activos);
            } catch (error) {
                console.error("Error fetching active clients:", error);
                
            }
        }

        getClientesActivos();
    }, [])

    return (
        <div>
            Total Clientes Activos: {clientesActivos.length}
        </div>
    );

}