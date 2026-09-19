import { useEffect, useState } from "react";
import api from "../services/api";
import { obtenerProductos } from "../services/productService";
import type { Product } from "../types/product";

interface InventoryMovement {
  id: number;
  productId: number;
  userId: number;
  type: string;
  quantity: number;
  createdAt: string;
  product?: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

function Inventory() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [movimientos, setMovimientos] = useState<
    InventoryMovement[]
  >([]);

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState<"entry" | "exit">("entry");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * =========================================================
   * ORDENAMIENTO POR ID
   * =========================================================
   *
   * true  = menor a mayor
   * false = mayor a menor
   */

  const [ordenIdAscendente, setOrdenIdAscendente] =
    useState(true);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError("");

      const [productosData, movimientosResponse] =
        await Promise.all([
          obtenerProductos(),
          api.get<InventoryMovement[]>(
            "/inventory/movements"
          )
        ]);

      setProductos(productosData);

      setMovimientos(
        movimientosResponse.data || []
      );
    } catch (error: any) {
      console.error(
        "Error al cargar inventario:",
        error
      );

      setError(
        error.response?.data?.message ||
          "No se pudieron cargar los datos del inventario."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const registrarMovimiento = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!productId) {
      setError("Debes seleccionar un producto.");
      return;
    }

    const cantidad = Number(quantity);

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      setError(
        "La cantidad debe ser un número entero mayor que 0."
      );
      return;
    }

    const productoSeleccionado = productos.find(
      (producto) =>
        producto.id === Number(productId)
    );

    if (!productoSeleccionado) {
      setError("El producto seleccionado no existe.");
      return;
    }

    if (
      type === "exit" &&
      cantidad > productoSeleccionado.stock
    ) {
      setError(
        `No puedes retirar ${cantidad} unidades. El producto solo tiene ${productoSeleccionado.stock} en stock.`
      );
      return;
    }

    try {
      setSaving(true);

      const endpoint =
        type === "entry"
          ? "/inventory/entry"
          : "/inventory/exit";

      await api.post(endpoint, {
        productId: Number(productId),
        quantity: cantidad
      });

      setSuccess(
        type === "entry"
          ? "Entrada de inventario registrada correctamente."
          : "Salida de inventario registrada correctamente."
      );

      setProductId("");
      setQuantity("");

      await cargarDatos();
    } catch (error: any) {
      console.error(
        "Error al registrar movimiento:",
        error
      );

      setError(
        error.response?.data?.message ||
          "No se pudo registrar el movimiento."
      );
    } finally {
      setSaving(false);
    }
  };

  const obtenerNombreProducto = (
    movimiento: InventoryMovement
  ) => {
    if (movimiento.product?.name) {
      return movimiento.product.name;
    }

    const producto = productos.find(
      (item) =>
        item.id === movimiento.productId
    );

    return producto?.name || "Producto desconocido";
  };

  const invertirOrdenId = () => {
    setOrdenIdAscendente(
      (ordenActual) => !ordenActual
    );
  };

  const movimientosOrdenados = [
    ...movimientos
  ].sort((a, b) => {
    const resultado =
      Number(a.id) - Number(b.id);

    return ordenIdAscendente
      ? resultado
      : -resultado;
  });

  if (loading) {
    return (
      <div>
        <h1>Inventario</h1>
        <p>Cargando información del inventario...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1>Inventario</h1>
          <p>
            Registra entradas y salidas de productos.
          </p>
        </div>
      </div>

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "#fee2e2",
            color: "#991b1b"
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
            color: "#166534"
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
          boxShadow:
            "0 2px 8px rgba(0, 0, 0, 0.06)"
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          Registrar movimiento
        </h2>

        <form onSubmit={registrarMovimiento}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px"
            }}
          >
            <div>
              <label
                htmlFor="movement-type"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: 600
                }}
              >
                Tipo de movimiento
              </label>

              <select
                id="movement-type"
                value={type}
                onChange={(event) =>
                  setType(
                    event.target.value as
                      | "entry"
                      | "exit"
                  )
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db"
                }}
              >
                <option value="entry">
                  Entrada
                </option>

                <option value="exit">
                  Salida
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="product"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: 600
                }}
              >
                Producto
              </label>

              <select
                id="product"
                value={productId}
                onChange={(event) =>
                  setProductId(event.target.value)
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db"
                }}
              >
                <option value="">
                  Selecciona un producto
                </option>

                {productos.map((producto) => (
                  <option
                    key={producto.id}
                    value={producto.id}
                  >
                    {producto.name} — Stock:{" "}
                    {producto.stock}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="quantity"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: 600
                }}
              >
                Cantidad
              </label>

              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(event) =>
                  setQuantity(event.target.value)
                }
                placeholder="Ej. 5"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db"
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              marginTop: "20px",
              padding: "11px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: saving
                ? "not-allowed"
                : "pointer",
              background:
                type === "entry"
                  ? "#2563eb"
                  : "#dc2626",
              color: "white",
              fontWeight: 600,
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving
              ? "Registrando..."
              : type === "entry"
              ? "Registrar entrada"
              : "Registrar salida"}
          </button>
        </form>
      </div>

      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow:
            "0 2px 8px rgba(0, 0, 0, 0.06)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "20px"
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 0
            }}
          >
            Historial de movimientos
          </h2>

          <button
            type="button"
            onClick={invertirOrdenId}
            title={
              ordenIdAscendente
                ? "Orden actual: de menor a mayor. Haz clic para invertir."
                : "Orden actual: de mayor a menor. Haz clic para invertir."
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px 18px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              cursor: "pointer",
              background: "white",
              color: "#374151",
              fontWeight: "600",
              whiteSpace: "nowrap"
            }}
          >
            <span
              style={{
                fontSize: "18px",
                lineHeight: "1"
              }}
            >
              {ordenIdAscendente
                ? "↑↓"
                : "↓↑"}
            </span>

            <span>
              Ordenar ID
            </span>
          </button>
        </div>

        {movimientosOrdenados.length === 0 ? (
          <p>
            Todavía no hay movimientos de inventario.
          </p>
        ) : (
          <div
            style={{
              overflowX: "auto"
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse"
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom:
                        "1px solid #e5e7eb"
                    }}
                  >
                    ID
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom:
                        "1px solid #e5e7eb"
                    }}
                  >
                    Producto
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom:
                        "1px solid #e5e7eb"
                    }}
                  >
                    Tipo
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom:
                        "1px solid #e5e7eb"
                    }}
                  >
                    Cantidad
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom:
                        "1px solid #e5e7eb"
                    }}
                  >
                    Usuario
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom:
                        "1px solid #e5e7eb"
                    }}
                  >
                    Fecha
                  </th>
                </tr>
              </thead>

              <tbody>
                {movimientosOrdenados.map(
                  (movimiento) => (
                    <tr key={movimiento.id}>
                      <td
                        style={{
                          padding: "12px",
                          borderBottom:
                            "1px solid #f3f4f6"
                        }}
                      >
                        {movimiento.id}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          borderBottom:
                            "1px solid #f3f4f6"
                        }}
                      >
                        {obtenerNombreProducto(
                          movimiento
                        )}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          borderBottom:
                            "1px solid #f3f4f6"
                        }}
                      >
                        {movimiento.type === "ENTRADA" ||
                        movimiento.type === "entry"
                          ? "Entrada"
                          : "Salida"}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          borderBottom:
                            "1px solid #f3f4f6"
                        }}
                      >
                        {movimiento.quantity}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          borderBottom:
                            "1px solid #f3f4f6"
                        }}
                      >
                        {movimiento.user?.name ||
                          "Usuario"}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          borderBottom:
                            "1px solid #f3f4f6"
                        }}
                      >
                        {new Date(
                          movimiento.createdAt
                        ).toLocaleString("es-DO")}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventory;