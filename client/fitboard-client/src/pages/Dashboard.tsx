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
    <main className="min-h-screen  bg-gray-950 text-white md:!p-10 !p-2 sm:flex-1/2 ">
  <h1 className="md:!text-3xl md:!ml-15 text-center text-2xl font-bold !mb-8 concert-one-regular">DASHBOARD</h1>

  {loading ? (
    <div className="flex !justify-center  !h-40">
      <Spinner size="lg" />
    </div>
  ) : (
    <div className=" !grid md:!ml-15  w-full grid-cols-2 md:!grid-cols-4  !gap-10 !ml-3">
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
