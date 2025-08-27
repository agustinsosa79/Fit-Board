import { useEffect, useState } from 'react';
import { ClientesTotales } from '../components/dashboard/seccion-top/ClientesTotales';
import { ClientesActivos } from '../components/dashboard/seccion-top/ClientesActivos';
import { ClientesInactivos } from '../components/dashboard/seccion-top/ClientesInactivos';
import { Spinner } from '@heroui/react';
import { ClientesNuevos } from '../components/dashboard/seccion-top/ClientesNuevos';
import{ DashClients } from '../components/dashboard/seccion-top/DashClients';
import ReporteClientes from '../components/dashboard/seccion-bottom/ReporteClientes';



export const Dashboard = () => {
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
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
  <h1 className="!text-3xl !ml-15 font-bold !mb-8 concert-one-regular">Dashboard de Principal</h1>

  {loading ? (
    <div className="flex !justify-center !items-center !h-40">
      <Spinner size="lg" />
    </div>
  ) : (
    <div className="grid !ml-15 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 !gap-6">
      <ClientesTotales  loading={loading} />
      <ClientesActivos />
      <ClientesInactivos />
      <ClientesNuevos loading={loading} />
    </div>
  )}
  <DashClients />
  <div>
    <ReporteClientes />
  </div>
</main>

  );
};
