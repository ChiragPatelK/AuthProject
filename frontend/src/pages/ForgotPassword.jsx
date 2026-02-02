import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "../validators/auth.schema";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setMessage("");
    const result = forgotPasswordSchema.safeParse({
      email,
    });

    if (!result.success) {
      const firstError = result.error.issues[0];
      setError(firstError.message);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Request failed");
        return;
      }

      setMessage("OTP sent. Redirecting...");

      // ✅ REDIRECT after success
      setTimeout(() => {
        navigate("/reset-password", {
          state: { email }, // optional UX improvement
        });
      }, 1500);
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
      >
        <h2 className="text-xl font-bold mb-4">
          Forgot Password
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        {message && (
          <p className="text-green-500 text-sm mb-2">
            {message}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 mb-4 rounded bg-slate-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          disabled={loading}
          className={`w-full py-2 rounded ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
            }`}
        >
          {loading ? "Loading..." : "Send otp"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
