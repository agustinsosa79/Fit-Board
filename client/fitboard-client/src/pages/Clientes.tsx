// Clientes.tsx
import { ClientForm } from '../components/clientes/form/ClientForm';
import { ListaClientes } from '../components/clientes/ListaClientes';

export const Clientes = () => {


  return (
    <div className="md:!p-0 md:!ml-20 md:flex md:flex-row gap-10 !h-screen !sm:flex sm:flex-col">
      <ClientForm  />
      <ListaClientes />
    </div>
  );
};
