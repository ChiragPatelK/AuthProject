/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { decodeToken } from "../utils/jwt";
import { loginSchema } from "../validators/auth.schema";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    // ✅ ZOD VALIDATION
    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data), // validated data
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      const decoded = decodeToken(data.token);
      login(data.token, decoded.role);
      navigate("/profile");
    } catch {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-lg w-80"
        noValidate
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-slate-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className={`w-full py-2 rounded ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="mt-4 text-sm text-center text-slate-400">
          <p>
            <a
              href="/forgot-password"
              className="text-blue-400 hover:underline"
            >
              Forgot password?
            </a>
          </p>

          <p className="mt-2">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Click here to Register
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
}

export default Login;
