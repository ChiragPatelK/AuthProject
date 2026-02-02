import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Request failed");
        return;
      }

      // Backend sends generic success message
      setMessage(
        "If the email exists, an OTP has been sent."
      );
    } catch (err) {
      setError("Server error");
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

        <button className="w-full bg-blue-500 py-2 rounded">
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
