import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { user } = useContext(Context);
    if (!user) {
        return <Navigate to="/login" replace />
    }
    else {
        return children;
    }
}

export default ProtectedRoute