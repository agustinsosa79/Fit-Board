// Clientes.tsx
import { ClientForm } from '../components/clientes/Form/ClientForm';
import { ListaClientes } from '../components/clientes/ListaClientes';

export const Clientes = () => {


  return (
    <div className="!p-0 !m-0 flex flex-row gap-none h-screen">
      <ClientForm  />
      <ListaClientes />
    </div>
  );
};
