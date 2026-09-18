import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const manejarLogin = async (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setCargando(true);

    try {
      await iniciarSesion(email, password);

      navigate("/");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);

      const mensaje =
        error.response?.data?.message ||
        "No se pudo iniciar sesión.";

      setError(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
        }}
      >
        <h1
          style={{
            marginTop: 0,
            marginBottom: "8px"
          }}
        >
          Iniciar sesión
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "24px"
          }}
        >
          Accede a tu cuenta de Stock Nova.
        </p>

        <form onSubmit={manejarLogin}>
          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "bold"
              }}
            >
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="correo@ejemplo.com"
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px"
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "bold"
              }}
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Tu contraseña"
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px"
              }}
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: "18px",
                padding: "12px",
                background: "#fee2e2",
                color: "#991b1b",
                borderRadius: "8px"
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: cargando
                ? "not-allowed"
                : "pointer",
              background: "#1f2937",
              color: "white",
              fontWeight: "bold"
            }}
          >
            {cargando
              ? "Iniciando sesión..."
              : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;