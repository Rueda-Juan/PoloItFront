import { useState } from "react";
import { registerUser } from "../../../api/apiAuth";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(form);
      navigate("/login");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Error al registrar. Intenta nuevamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 via-pink-100 to-indigo-100">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/50">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-medium py-2 rounded-lg transition-colors"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
