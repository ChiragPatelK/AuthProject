import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function AdminUsers() {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For editing user
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("user");

  /* ===============================
     FETCH ALL USERS (ADMIN API)
  =============================== */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch users");
          return;
        }

        setUsers(data.users);
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  /* ===============================
     DELETE USER
  =============================== */
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        alert("Failed to delete user");
        return;
      }

      // Update UI
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert("Server error");
    }
  };

  /* ===============================
     START EDIT USER
  =============================== */
  const startEdit = (user) => {
    setEditingUser(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
  };

  /* ===============================
     UPDATE USER
  =============================== */
  const updateUser = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editName,
            email: editEmail,
            role: editRole,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      // Update UI without refetch
      setUsers(
        users.map((u) =>
          u.id === id ? { ...u, ...data.user } : u
        )
      );

      setEditingUser(null);
    } catch (err) {
      alert("Server error");
    }
  };

  /* ===============================
     FILTER USERS (SEARCH LOGIC)
  =============================== */
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  /* ===============================
     UI STATES
  =============================== */
  if (loading) {
    return (
      <div className="p-6 text-white">Loading users...</div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">{error}</div>
    );
  }

  /* ===============================
     RENDER
  =============================== */
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">
        Admin – Manage Users
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="mb-4 p-2 w-full max-w-md bg-slate-700 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* USERS TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full bg-slate-800 rounded-lg">
          <thead className="bg-slate-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-slate-700"
              >
                {/* NAME */}
                <td className="p-3">
                  {editingUser === user.id ? (
                    <input
                      className="bg-slate-700 p-1 rounded"
                      value={editName}
                      onChange={(e) =>
                        setEditName(e.target.value)
                      }
                    />
                  ) : (
                    user.name
                  )}
                </td>

                {/* EMAIL */}
                <td className="p-3">
                  {editingUser === user.id ? (
                    <input
                      className="bg-slate-700 p-1 rounded"
                      value={editEmail}
                      onChange={(e) =>
                        setEditEmail(e.target.value)
                      }
                    />
                  ) : (
                    user.email
                  )}
                </td>

                {/* ROLE */}
                <td className="p-3">
                  {editingUser === user.id ? (
                    <select
                      className="bg-slate-700 p-1 rounded"
                      value={editRole}
                      onChange={(e) =>
                        setEditRole(e.target.value)
                      }
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-3 space-x-2">
                  {editingUser === user.id ? (
                    <>
                      <button
                        onClick={() => updateUser(user.id)}
                        className="bg-green-500 px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="bg-gray-500 px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(user)}
                        className="bg-blue-500 px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500 px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
