import { useState } from "react";
import { supabase } from "../pages/supabaseclient";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Password updated successfully! Please log in again.");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleUpdatePassword}
        className="bg-gray-400 p-8 shadow-md rounded w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Password
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-black p-2 rounded hover:bg-green-600"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
