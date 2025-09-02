import type { Cliente } from '../../types/clientes';
import { createContext,useContext, useEffect, useState } from 'react';
import { fetchClientes } from '../../services/clientesService';
import { useAuth } from './useAuth';


interface ClientContextType  {
  clientes:  Cliente[],
  setClientes: (clientes: Cliente[]) => void,
  agregarCliente: (cliente: Cliente) => void,
  loading: boolean,
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
    const {user, loading} = useAuth()
    const [clientes, setClientes] = useState<Cliente[]>([]);

    

    useEffect(() => {

        const getClientes = async () => {
            if (loading) return
            if (!user) return
            try {
                    const data = await fetchClientes();
                    setClientes(data);
                    
            } catch (error) {
                console.error("Error fetching clientes:", error);
            } 
            }
        getClientes();
    }, [loading, user])

    const agregarCliente = (cliente: Cliente) => {
        setClientes((prevClientes) => [...prevClientes, cliente]);
    }
    return (
        <ClientesContext.Provider value={{
            clientes,
            setClientes,
            agregarCliente,
            loading,
        }}>
            {children}
        </ClientesContext.Provider>
    );
};
