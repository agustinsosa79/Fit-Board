import { fetchClientes } from "../../services/clientesService";
import type { Cliente } from "../../types/clientes";
import { useEffect, useState } from "react";


export const ClientesInactivos = () => {
    const [clientesInactivos, setClientesInactivos] = useState<Cliente[]>([])


    useEffect(() => {
        const getClientesInactivos = async () => {
            try {
                const data = await fetchClientes();
                const inactivos = data.filter(cliente => cliente.estado === "inactivo")
                setClientesInactivos(inactivos);
            } catch (error) {
                console.error("Error fetching inactive clients:", error);

            }
        }

        getClientesInactivos();
    }, [])

    return (
        <div>
            Total Clientes Inactivos: {clientesInactivos.length}
        </div>
    );

}