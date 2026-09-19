import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  obtenerUsuario,
  cerrarSesion
} from "../services/authService";

function TopBar() {
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] =
    useState(false);

  const [usuario, setUsuario] =
    useState(obtenerUsuario());

  const obtenerLetraPerfil = () => {
    const letraGuardada =
      localStorage.getItem(
        "stocknova_profile_letter"
      );

    return (
      letraGuardada ||
      usuario?.name?.charAt(0).toUpperCase() ||
      "U"
    );
  };

  const obtenerColorPerfil = () => {
    return (
      localStorage.getItem(
        "stocknova_profile_color"
      ) || "blue"
    );
  };

  const [letraPerfil, setLetraPerfil] =
    useState(obtenerLetraPerfil());

  const [colorPerfil, setColorPerfil] =
    useState(obtenerColorPerfil());

  useEffect(() => {
    const actualizarUsuario = () => {
      setUsuario(obtenerUsuario());
    };

    window.addEventListener(
      "stocknova_user_changed",
      actualizarUsuario
    );

    return () => {
      window.removeEventListener(
        "stocknova_user_changed",
        actualizarUsuario
      );
    };
  }, []);

  useEffect(() => {
    const actualizarLetraPerfil = () => {
      const usuarioActual =
        obtenerUsuario();

      const letraGuardada =
        localStorage.getItem(
          "stocknova_profile_letter"
        );

      const nuevaLetra =
        letraGuardada ||
        usuarioActual?.name
          ?.charAt(0)
          .toUpperCase() ||
        "U";

      setLetraPerfil(nuevaLetra);
    };

    window.addEventListener(
      "stocknova_profile_letter_changed",
      actualizarLetraPerfil
    );

    window.addEventListener(
      "stocknova_user_changed",
      actualizarLetraPerfil
    );

    return () => {
      window.removeEventListener(
        "stocknova_profile_letter_changed",
        actualizarLetraPerfil
      );

      window.removeEventListener(
        "stocknova_user_changed",
        actualizarLetraPerfil
      );
    };
  }, []);

  useEffect(() => {
    const actualizarColorPerfil = () => {
      const colorGuardado =
        localStorage.getItem(
          "stocknova_profile_color"
        ) || "blue";

      setColorPerfil(colorGuardado);
    };

    window.addEventListener(
      "stocknova_profile_color_changed",
      actualizarColorPerfil
    );

    return () => {
      window.removeEventListener(
        "stocknova_profile_color_changed",
        actualizarColorPerfil
      );
    };
  }, []);

  const manejarCerrarSesion = () => {
    cerrarSesion();

    navigate("/login");
  };

  return (
    <header className="topbar">

      <div className="topbar-left">

        <div className="topbar-title">

          <h1>Stock Nova</h1>

          <p>
            Panel de administración
          </p>

        </div>

      </div>

      <div className="topbar-right">

        <div className="user-menu">

          <button
            type="button"
            className="user-button"
            onClick={() =>
              setMenuAbierto(!menuAbierto)
            }
          >

            <div
              className={`user-avatar avatar-color-${colorPerfil}`}
            >
              {letraPerfil}
            </div>

            <div className="user-info">

              <span className="user-name">
                {usuario?.name || "Usuario"}
              </span>

              <span className="user-role">
                {usuario?.role || "USER"}
              </span>

            </div>

            <span className="user-arrow">
              {menuAbierto ? "▲" : "▼"}
            </span>

          </button>

          {menuAbierto && (

            <div className="user-dropdown">

              <div className="user-dropdown-header">

                <strong>
                  {usuario?.name || "Usuario"}
                </strong>

                <span>
                  {usuario?.email || ""}
                </span>

              </div>

              <div className="user-dropdown-divider" />

              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setMenuAbierto(false);
                  navigate("/profile");
                }}
              >
                Mi perfil
              </button>

              <button
                type="button"
                className="dropdown-item logout-item"
                onClick={manejarCerrarSesion}
              >
                Cerrar sesión
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default TopBar;