import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, userRole, logout } = useAuth();

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
      {/* Left side */}
      <Link to="/" className="text-lg font-bold">
        MyApp
      </Link>

      {/* Right side */}
      <div className="space-x-4">
        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className="text-slate-300 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-slate-300 hover:text-white"
            >
              Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link
              to="/profile"
              className="text-slate-300 hover:text-white"
            >
              Profile
            </Link>

            {userRole === "admin" && (
              <Link
                to="/admin/users"
                className="text-slate-300 hover:text-white"
              >
                Admin
              </Link>
            )}

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
