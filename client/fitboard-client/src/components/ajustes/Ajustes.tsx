import { useAuth } from "../../context/clientes-context/useAuth";


export const Ajustes = () => {
  const { user } = useAuth()
  console.log(user);
  
  return <div>Ajustes</div>;
};
