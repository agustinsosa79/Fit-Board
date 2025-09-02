import { useAuth } from "../../context/clientescontext/useAuth";
import { Navigate, Outlet } from "react-router";

export const PrivateRoute = () => {

    const { user, loading } = useAuth();

    if (loading) {
        return <div>Cargando...</div>;
    }
    

    return user ? <Outlet /> : <Navigate to="/login" />;
};
