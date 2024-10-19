import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import BarraNavegacao from "../barra_navegacao/BarraNavegacao";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.usuario
            ? <><BarraNavegacao /><Outlet /></>
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;