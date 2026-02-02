import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Change password failed");
        return;
      }

      setSuccess("Password changed successfully");

      // 🔐 Security best practice:
      // logout user after password change
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1500);
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
          Change Password
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        {success && (
          <p className="text-green-500 text-sm mb-2">
            {success}
          </p>
        )}

        <input
          type="password"
          placeholder="Old password"
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 mb-4 rounded bg-slate-700 text-white"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 py-2 rounded">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
