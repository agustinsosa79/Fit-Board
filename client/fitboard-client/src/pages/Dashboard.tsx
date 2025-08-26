import { useEffect, useState } from 'react';
import type { Cliente } from '../types/clientes';
import { ClientesTotales } from '../components/dashboard/ClientesTotales';
import { ClientesActivos } from '../components/dashboard/ClientesActivos';
import { ClientesInactivos } from '../components/dashboard/ClientesInactivos';
import { Spinner } from '@heroui/react';
import { fetchClientes } from '../services/clientesService';
import { ClientesNuevos } from '../components/dashboard/ClientesNuevos';



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
    <main className="min-h-screen bg-gray-950 text-white !p-8">
  <h1 className="!text-3xl !ml-15 font-bold !mb-8 concert-one-regular">Dashboard de Clientes</h1>

  {loading ? (
    <div className="flex !justify-center !items-center !h-40">
      <Spinner size="lg" />
    </div>
  ) : (
    <div className="grid !ml-15 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 !gap-6">
      <ClientesTotales clientes={clientes} loading={loading} />
      <ClientesActivos />
      <ClientesInactivos />
      <ClientesNuevos loading={loading} />
    </div>
  )}
</main>

  );
};
