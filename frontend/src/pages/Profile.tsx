import { useState } from "react";
import { obtenerUsuario } from "../services/authService";
import api from "../services/api";

function Profile() {
  const usuario = obtenerUsuario();

  const letraGuardada =
    localStorage.getItem("stocknova_profile_letter");

  const colorGuardado =
    localStorage.getItem("stocknova_profile_color");

  const [nombrePerfil, setNombrePerfil] =
    useState(usuario?.name || "");

  const [emailPerfil, setEmailPerfil] =
    useState(usuario?.email || "");

  const [cargandoPerfil, setCargandoPerfil] =
    useState(false);

  const [mensajePerfil, setMensajePerfil] =
    useState("");

  const [errorPerfil, setErrorPerfil] =
    useState("");

  const [letraPerfil, setLetraPerfil] =
    useState(
      letraGuardada ||
        usuario?.name?.charAt(0).toUpperCase() ||
        "U"
    );

  const [colorPerfil, setColorPerfil] =
    useState(colorGuardado || "blue");

  const [contraseñaActual, setContraseñaActual] =
    useState("");

  const [nuevaContraseña, setNuevaContraseña] =
    useState("");

  const [confirmarContraseña, setConfirmarContraseña] =
    useState("");

  const [cargando, setCargando] =
    useState(false);

  const [mensaje, setMensaje] =
    useState("");

  const [error, setError] =
    useState("");

  const manejarCambioLetra = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valor = event.target.value
      .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, "")
      .slice(0, 1)
      .toUpperCase();

    setLetraPerfil(valor);
  };

  const guardarPersonalizacion = () => {
    const letraFinal =
      letraPerfil.trim() ||
      nombrePerfil.charAt(0).toUpperCase() ||
      "U";

    localStorage.setItem(
      "stocknova_profile_letter",
      letraFinal
    );

    localStorage.setItem(
      "stocknova_profile_color",
      colorPerfil
    );

    setLetraPerfil(letraFinal);

    window.dispatchEvent(
      new Event("stocknova_profile_letter_changed")
    );

    window.dispatchEvent(
      new Event("stocknova_profile_color_changed")
    );

    setMensajePerfil(
      "Personalización del perfil actualizada correctamente."
    );

    setErrorPerfil("");
  };

  const manejarActualizacionPerfil = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMensajePerfil("");
    setErrorPerfil("");

    const nombreLimpio = nombrePerfil.trim();
    const emailLimpio = emailPerfil.trim().toLowerCase();

    if (!nombreLimpio) {
      setErrorPerfil(
        "El nombre es obligatorio."
      );
      return;
    }

    if (!emailLimpio) {
      setErrorPerfil(
        "El correo electrónico es obligatorio."
      );
      return;
    }

    if (
      !emailLimpio.includes("@") ||
      !emailLimpio.includes(".")
    ) {
      setErrorPerfil(
        "Introduce un correo electrónico válido."
      );
      return;
    }

    setCargandoPerfil(true);

    try {
      const respuesta = await api.put(
        "/auth/profile",
        {
          name: nombreLimpio,
          email: emailLimpio
        }
      );

      const usuarioActualizado =
        respuesta.data.user;

      localStorage.setItem(
        "stocknova_user",
        JSON.stringify(usuarioActualizado)
      );

      setNombrePerfil(
        usuarioActualizado.name
      );

      setEmailPerfil(
        usuarioActualizado.email
      );

      const letraGuardadaActual =
        localStorage.getItem(
          "stocknova_profile_letter"
        );

      if (!letraGuardadaActual) {
        setLetraPerfil(
          usuarioActualizado.name
            .charAt(0)
            .toUpperCase()
        );
      }

      window.dispatchEvent(
        new Event("stocknova_user_changed")
      );

      setMensajePerfil(
        respuesta.data.message ||
          "Perfil actualizado correctamente."
      );
    } catch (error: any) {
      console.error(
        "Error al actualizar perfil:",
        error
      );

      setErrorPerfil(
        error.response?.data?.message ||
          "No se pudo actualizar el perfil."
      );
    } finally {
      setCargandoPerfil(false);
    }
  };

  const manejarCambioContraseña = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMensaje("");
    setError("");

    if (nuevaContraseña.length < 6) {
      setError(
        "La nueva contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    if (
      nuevaContraseña !==
      confirmarContraseña
    ) {
      setError(
        "La nueva contraseña y la confirmación no coinciden."
      );
      return;
    }

    setCargando(true);

    try {
      const respuesta = await api.put(
        "/auth/change-password",
        {
          contraseñaActual,
          nuevaContraseña
        }
      );

      setMensaje(
        respuesta.data.message ||
          "Contraseña actualizada correctamente."
      );

      setContraseñaActual("");
      setNuevaContraseña("");
      setConfirmarContraseña("");
    } catch (error: any) {
      console.error(
        "Error al cambiar contraseña:",
        error
      );

      setError(
        error.response?.data?.message ||
          "No se pudo cambiar la contraseña."
      );
    } finally {
      setCargando(false);
    }
  };

  const coloresAvatar = [
    {
      id: "blue",
      nombre: "Azul",
      clase: "avatar-color-blue"
    },
    {
      id: "purple",
      nombre: "Morado",
      clase: "avatar-color-purple"
    },
    {
      id: "green",
      nombre: "Verde",
      clase: "avatar-color-green"
    },
    {
      id: "orange",
      nombre: "Naranja",
      clase: "avatar-color-orange"
    },
    {
      id: "red",
      nombre: "Rojo",
      clase: "avatar-color-red"
    },
    {
      id: "pink",
      nombre: "Rosa",
      clase: "avatar-color-pink"
    }
  ];

  const claseAvatar =
    coloresAvatar.find(
      (color) => color.id === colorPerfil
    )?.clase || "avatar-color-blue";

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h2>Mi perfil</h2>

          <p>
            Consulta tu información y administra la
            seguridad de tu cuenta.
          </p>
        </div>
      </div>

      <div className="profile-grid">

        <section className="content-card">

          <div className="content-card-header">
            <div>
              <h3>
                Información de la cuenta
              </h3>

              <p>
                Información asociada a tu cuenta
                de Stock Nova.
              </p>
            </div>
          </div>

          <div className="profile-user">

            <div
              className={`profile-avatar ${claseAvatar}`}
            >
              {letraPerfil}
            </div>

            <div>
              <h3>
                {nombrePerfil || "Usuario"}
              </h3>

              <p>
                {emailPerfil || "Sin correo"}
              </p>
            </div>

          </div>

          <form
            onSubmit={manejarActualizacionPerfil}
          >

            <div className="profile-info-list">

              <div className="profile-info-item">

                <span>
                  Nombre
                </span>

                <input
                  id="nombrePerfil"
                  name="nombrePerfil"
                  type="text"
                  value={nombrePerfil}
                  onChange={(event) =>
                    setNombrePerfil(
                      event.target.value
                    )
                  }
                  placeholder="Introduce tu nombre"
                  autoComplete="name"
                  required
                />

              </div>

              <div className="profile-info-item">

                <span>
                  Correo electrónico
                </span>

                <input
                  id="emailPerfil"
                  name="emailPerfil"
                  type="email"
                  value={emailPerfil}
                  onChange={(event) =>
                    setEmailPerfil(
                      event.target.value
                    )
                  }
                  placeholder="Introduce tu correo"
                  autoComplete="email"
                  required
                />

              </div>

              <div className="profile-info-item">

                <span>
                  Rol
                </span>

                <strong>
                  {usuario?.role || "USER"}
                </strong>

              </div>

            </div>

            {errorPerfil && (
              <div className="error-message">
                {errorPerfil}
              </div>
            )}

            {mensajePerfil && (
              <div className="success-message">
                {mensajePerfil}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={cargandoPerfil}
            >
              {cargandoPerfil
                ? "Guardando..."
                : "Guardar información"}
            </button>

          </form>

          <div className="profile-letter-section">

            <div className="form-group">

              <label htmlFor="letraPerfil">
                Letra del perfil
              </label>

              <input
                id="letraPerfil"
                name="letraPerfil"
                type="text"
                value={letraPerfil}
                onChange={manejarCambioLetra}
                maxLength={1}
                placeholder="J"
              />

              <small className="profile-field-help">
                Puedes elegir la letra que quieres
                mostrar en tu avatar.
              </small>

            </div>

            <div className="form-group">

              <label>
                Color del avatar
              </label>

              <div className="avatar-color-options">

                {coloresAvatar.map((color) => (

                  <button
                    key={color.id}
                    type="button"
                    className={`avatar-color-option ${color.clase} ${
                      colorPerfil === color.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setColorPerfil(color.id)
                    }
                    title={color.nombre}
                    aria-label={`Seleccionar color ${color.nombre}`}
                  >
                    {colorPerfil === color.id
                      ? "✓"
                      : ""}
                  </button>

                ))}

              </div>

              <small className="profile-field-help">
                Elige el color que quieres utilizar
                en tu avatar.
              </small>

            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={guardarPersonalizacion}
            >
              Guardar personalización
            </button>

          </div>

        </section>

        <section className="content-card">

          <div className="content-card-header">
            <div>

              <h3>
                Cambiar contraseña
              </h3>

              <p>
                Actualiza la contraseña de tu cuenta.
              </p>

            </div>
          </div>

          <form
            onSubmit={manejarCambioContraseña}
          >

            <div className="form-group">

              <label htmlFor="contraseñaActual">
                Contraseña actual
              </label>

              <input
                id="contraseñaActual"
                name="contraseñaActual"
                type="password"
                value={contraseñaActual}
                onChange={(event) =>
                  setContraseñaActual(
                    event.target.value
                  )
                }
                placeholder="Introduce tu contraseña actual"
                autoComplete="current-password"
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="nuevaContraseña">
                Nueva contraseña
              </label>

              <input
                id="nuevaContraseña"
                name="nuevaContraseña"
                type="password"
                value={nuevaContraseña}
                onChange={(event) =>
                  setNuevaContraseña(
                    event.target.value
                  )
                }
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="confirmarContraseña">
                Confirmar nueva contraseña
              </label>

              <input
                id="confirmarContraseña"
                name="confirmarContraseña"
                type="password"
                value={confirmarContraseña}
                onChange={(event) =>
                  setConfirmarContraseña(
                    event.target.value
                  )
                }
                placeholder="Repite la nueva contraseña"
                autoComplete="new-password"
                required
              />

            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {mensaje && (
              <div className="success-message">
                {mensaje}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={cargando}
            >
              {cargando
                ? "Actualizando..."
                : "Cambiar contraseña"}
            </button>

          </form>

        </section>

      </div>

    </div>
  );
}

export default Profile;