import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { token, logout } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const updateProfile = async () => {
    const res = await fetch(
      "http://localhost:5000/api/users/me",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Update failed");
      return;
    }

    setMessage("Profile updated");
  };

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "This will permanently delete your account. Continue?"
    );

    if (!confirmDelete) return;

    await fetch("http://localhost:5000/api/users/me", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    logout();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">My Profile</h1>

      {message && (
        <p className="text-green-500 mb-2">{message}</p>
      )}

      <input
        placeholder="New name"
        className="block mb-2 p-2 bg-slate-700"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="New email"
        className="block mb-4 p-2 bg-slate-700"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={updateProfile}
        className="bg-blue-500 px-4 py-2 mr-2 rounded"
      >
        Update Profile
      </button>

      <button
        onClick={deleteAccount}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Delete Account
      </button>

      <button
        className="bg-red-500 px-4 py-2 rounded ml-2">
      <a
        href="/change-password"
        // className="inline-block mt-4 text-blue-400 hover:underline"
      >
        Change Password
      </a>
      </button>
    </div>
  );
}

export default Profile;
