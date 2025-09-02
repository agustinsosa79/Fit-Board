// Clientes.tsx
import { ClientForm } from '../components/clientes/form/ClientForm';
import { ListaClientes } from '../components/clientes/ListaClientes';

export const Clientes = () => {


  return (
    <div className="md:!p-0 md:!ml-20 md:flex md:flex-row gap-10 h-vw md:h-screen bg-black/80 md:bg-gradient-to-br from-black/70 to-gray-800  !sm:flex sm:flex-col">
      <ClientForm  />
      <ListaClientes />
    </div>
  );
};
