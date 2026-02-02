import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { isLoggedIn, userRole } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default AdminRoute;
