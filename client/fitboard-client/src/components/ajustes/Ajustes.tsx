import { useAuth } from "../../context/clientescontext/useAuth";


export const Ajustes = () => {
  const { user } = useAuth()
  console.log(user);
  
  return <div>Ajustes</div>;
};
