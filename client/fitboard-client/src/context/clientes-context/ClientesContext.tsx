import type { Cliente } from '../../types/clientes';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchClientes } from '../../services/clientesService';


interface ClientContextType  {
  clientes:  Cliente[],
  setClientes: (clientes: Cliente[]) => void,
  agregarCliente: (cliente: Cliente) => void,
  loading: boolean
};



const ClientesContext = createContext<ClientContextType | undefined>(undefined);
// eslint-disable-next-line react-refresh/only-export-components
    export const useClients = () => {  
    const context = useContext(ClientesContext)
    if(!context) {
        throw new Error("useClients must be used within a ClientesProvider");
    }

    return context;
}

export const ClientesProvider = ({ children }: { children: React.ReactNode }) => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getClientes = async () => {
            setLoading(true);
            try {
                    const data = await fetchClientes();
                    setClientes(data);
            } catch (error) {
                console.error("Error fetching clientes:", error);
            } finally {
                setLoading(false);
            }
            }
        getClientes();

    }, [])

    const agregarCliente = (cliente: Cliente) => {
        setClientes((prevClientes) => [...prevClientes, cliente]);
    }


    return (
        <ClientesContext.Provider value={{
            clientes,
            setClientes,
            agregarCliente,
            loading
        }}>
            {children}
        </ClientesContext.Provider>
    );
};
