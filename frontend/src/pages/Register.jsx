import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema } from "../validators/auth.schema";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setSuccess("");
    const result = registerSchema.safeParse({
      name,
      email,
      password,
    });

    if (!result.success) {
      const firstError = result.error.issues[0];
      setError(firstError.message);
      return;
    }


    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful! Please login.");

      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Server error");
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
        <h2 className="text-xl font-bold mb-4">Register</h2>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        {success && (
          <p className="text-green-500 text-sm mb-2">
            {success}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          {loading ? "Register in..." : "Register"}
        </button>
        <div className="mt-4 text-sm text-center text-slate-400">
          <p className="mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Click here to Login
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
}

export default Register;
