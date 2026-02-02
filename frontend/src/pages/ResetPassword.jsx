import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordSchema } from "../validators/auth.schema";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Guard route & safely read email
  useEffect(() => {
    if (!location.state?.email) {
      // User refreshed or came directly
      navigate("/forgot-password", { replace: true });
    } else {
      setEmail(location.state.email);
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setSuccess("");
    const result = resetPasswordSchema.safeParse({
      email,
      otp,
      newPassword,
    });

    if (!result.success) {
      const firstError = result.error.issues[0];
      setError(firstError.message);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Reset failed");
        return;
      }

      setSuccess("Password reset successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
      >
        <h2 className="text-xl font-bold mb-4 text-white">
          Reset Password
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-500 text-sm mb-2">
            {success}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />

        <input
          type="text"
          placeholder="OTP"
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 mb-4 rounded bg-slate-700 text-white"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          required
        />

        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white ${loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
