import { useEffect, useState } from "react";
import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../services/categoryService";

interface Category {
  id: number;
  name: string;
}

function Categories() {
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [nombre, setNombre] = useState("");

  const [categoriaEditando, setCategoriaEditando] =
    useState<number | null>(null);

  const [nombreEditado, setNombreEditado] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      setError("");

      const datos = await obtenerCategorias();

      const categoriasValidas = datos.filter(
        (categoria): categoria is Category =>
          categoria !== undefined &&
          categoria !== null &&
          typeof categoria.id === "number" &&
          typeof categoria.name === "string"
      );

      setCategorias(categoriasValidas);
    } catch (error: any) {
      console.error("Error al cargar categorías:", error);

      setError(
        error.response?.data?.message ||
          "No se pudieron cargar las categorías."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const manejarCrear = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    try {
      setSaving(true);

      await crearCategoria(nombreLimpio);

      await cargarCategorias();

      setNombre("");

      setSuccess("Categoría creada correctamente.");
    } catch (error: any) {
      console.error("Error al crear categoría:", error);

      setError(
        error.response?.data?.message ||
          "No se pudo crear la categoría."
      );
    } finally {
      setSaving(false);
    }
  };

  const comenzarEdicion = (categoria: Category) => {
    setError("");
    setSuccess("");

    setCategoriaEditando(categoria.id);
    setNombreEditado(categoria.name);
  };

  const cancelarEdicion = () => {
    setCategoriaEditando(null);
    setNombreEditado("");
  };

  const guardarEdicion = async (id: number) => {
    setError("");
    setSuccess("");

    const nombreLimpio = nombreEditado.trim();

    if (!nombreLimpio) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    try {
      setSaving(true);

      await actualizarCategoria(id, nombreLimpio);

      await cargarCategorias();

      cancelarEdicion();

      setSuccess("Categoría actualizada correctamente.");
    } catch (error: any) {
      console.error("Error al actualizar categoría:", error);

      setError(
        error.response?.data?.message ||
          "No se pudo actualizar la categoría."
      );
    } finally {
      setSaving(false);
    }
  };

  const manejarEliminar = async (categoria: Category) => {
    setError("");
    setSuccess("");

    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar la categoría "${categoria.name}"?`
    );

    if (!confirmar) {
      return;
    }

    try {
      setSaving(true);

      await eliminarCategoria(categoria.id);

      await cargarCategorias();

      setSuccess("Categoría eliminada correctamente.");
    } catch (error: any) {
      console.error("Error al eliminar categoría:", error);

      setError(
        error.response?.data?.message ||
          "No se pudo eliminar la categoría."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Categorías</h1>
        <p>Cargando categorías...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1>Categorías</h1>
          <p>Administra las categorías de tus productos.</p>
        </div>
      </div>

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "#fee2e2",
            color: "#991b1b",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "#dcfce7",
            color: "#166534",
          }}
        >
          {success}
        </div>
      )}

      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Nueva categoría</h2>

        <form onSubmit={manejarCrear}>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <input
              id="nombre-categoria"
              name="nombre"
              type="text"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              placeholder="Ej. Electrónica"
              autoComplete="off"
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "11px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />

            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "11px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: saving ? "not-allowed" : "pointer",
                background: "#2563eb",
                color: "white",
                fontWeight: 600,
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Guardando..." : "Crear categoría"}
            </button>
          </div>
        </form>
      </div>

      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Lista de categorías</h2>

        {categorias.length === 0 ? (
          <p>Todavía no hay categorías registradas.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    ID
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Nombre
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #f3f4f6",
                      }}
                    >
                      {categoria.id}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #f3f4f6",
                      }}
                    >
                      {categoriaEditando === categoria.id ? (
                        <input
                          id={`editar-categoria-${categoria.id}`}
                          name={`editar-categoria-${categoria.id}`}
                          type="text"
                          value={nombreEditado}
                          onChange={(event) =>
                            setNombreEditado(event.target.value)
                          }
                          autoComplete="off"
                          style={{
                            width: "100%",
                            maxWidth: "300px",
                            padding: "9px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                          }}
                        />
                      ) : (
                        categoria.name
                      )}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #f3f4f6",
                      }}
                    >
                      {categoriaEditando === categoria.id ? (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              guardarEdicion(categoria.id)
                            }
                            disabled={saving}
                            style={{
                              padding: "8px 12px",
                              border: "none",
                              borderRadius: "6px",
                              cursor: saving
                                ? "not-allowed"
                                : "pointer",
                              background: "#16a34a",
                              color: "white",
                              fontWeight: 600,
                            }}
                          >
                            Guardar
                          </button>

                          <button
                            type="button"
                            onClick={cancelarEdicion}
                            disabled={saving}
                            style={{
                              padding: "8px 12px",
                              border: "none",
                              borderRadius: "6px",
                              cursor: saving
                                ? "not-allowed"
                                : "pointer",
                              background: "#6b7280",
                              color: "white",
                              fontWeight: 600,
                            }}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              comenzarEdicion(categoria)
                            }
                            disabled={saving}
                            style={{
                              padding: "8px 12px",
                              border: "none",
                              borderRadius: "6px",
                              cursor: saving
                                ? "not-allowed"
                                : "pointer",
                              background: "#2563eb",
                              color: "white",
                              fontWeight: 600,
                            }}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              manejarEliminar(categoria)
                            }
                            disabled={saving}
                            style={{
                              padding: "8px 12px",
                              border: "none",
                              borderRadius: "6px",
                              cursor: saving
                                ? "not-allowed"
                                : "pointer",
                              background: "#dc2626",
                              color: "white",
                              fontWeight: 600,
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;