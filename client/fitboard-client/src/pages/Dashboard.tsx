import { useEffect, useState } from 'react';
import type { Cliente } from '../types/clientes';
import { ClientesTotales } from '../components/dashboard/ClientesTotales';
import { ClientesActivos } from '../components/dashboard/ClientesActivos';
import { ClientesInactivos } from '../components/dashboard/ClientesInactivos';
import { Spinner } from '@heroui/react';
import { fetchClientes } from '../services/clientesService';



export const Dashboard = () => {
const [clientes, setClientes] = useState<Cliente[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchClientes();
      const data = response;
      setClientes(data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return (
    <>
    <h1>Clientes Totales</h1>
      <ClientesTotales clientes={clientes} loading={loading} />
      <h2>Clientes Activos</h2>
      <ClientesActivos />
      <h2>Clientes Inactivos</h2>
      <ClientesInactivos />
      {loading && <Spinner />}
    </>
  );
};
