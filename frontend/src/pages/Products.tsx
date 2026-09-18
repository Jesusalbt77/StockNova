import { useEffect, useState } from "react";

import type { Product } from "../types/product";

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  type CrearProductoData
} from "../services/productService";

import {
  obtenerCategorias,
  type Category
} from "../services/categoryService";

function Products() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<Category[]>([]);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [busqueda, setBusqueda] = useState("");

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const [productoEditando, setProductoEditando] =
    useState<Product | null>(null);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError("");

      const [
        productosRecibidos,
        categoriasRecibidas
      ] = await Promise.all([
        obtenerProductos(),
        obtenerCategorias()
      ]);

      setProductos(productosRecibidos);
      setCategorias(categoriasRecibidas);
    } catch (error) {
      console.error(
        "Error al obtener datos:",
        error
      );

      setError(
        "No se pudieron cargar los productos y categorías."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const productosFiltrados = productos.filter(
    (producto) => {
      const nombreProducto = String(
        producto.name || ""
      ).toLowerCase();

      const textoBusqueda =
        busqueda.trim().toLowerCase();

      return nombreProducto.includes(
        textoBusqueda
      );
    }
  );

  const limpiarBusqueda = () => {
    setBusqueda("");
  };

  const limpiarFormulario = () => {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setStockMinimo("");
    setCategoriaId("");
    setProductoEditando(null);
  };

  const abrirFormularioCrear = () => {
    limpiarFormulario();

    setMensaje("");
    setError("");
    setMostrarFormulario(true);
  };

  const abrirFormularioEditar = (
    producto: Product
  ) => {
    setProductoEditando(producto);

    setNombre(producto.name);
    setDescripcion(producto.description || "");
    setPrecio(String(producto.price));
    setStock(String(producto.stock));
    setStockMinimo(String(producto.minStock));
    setCategoriaId(String(producto.categoryId));

    setMensaje("");
    setError("");
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    limpiarFormulario();

    setMostrarFormulario(false);
    setMensaje("");
    setError("");
  };

  const manejarGuardarProducto = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMensaje("");
    setError("");

    try {
      setGuardando(true);

      const datosProducto: CrearProductoData = {
        name: nombre.trim(),
        description:
          descripcion.trim() || undefined,
        price: Number(precio),
        stock: Number(stock),
        minStock: Number(stockMinimo),
        categoryId: Number(categoriaId)
      };

      if (productoEditando) {
        const productoActualizado =
          await actualizarProducto(
            productoEditando.id,
            datosProducto
          );

        setProductos(
          (productosActuales) =>
            productosActuales.map(
              (producto) =>
                producto.id ===
                productoEditando.id
                  ? productoActualizado
                  : producto
            )
        );

        setMensaje(
          "Producto actualizado correctamente."
        );
      } else {
        const productoCreado =
          await crearProducto(
            datosProducto
          );

        setProductos(
          (productosActuales) => [
            ...productosActuales,
            productoCreado
          ]
        );

        setMensaje(
          "Producto creado correctamente."
        );
      }

      limpiarFormulario();
      setMostrarFormulario(false);
    } catch (error: any) {
      console.error(
        "Error al guardar producto:",
        error
      );

      const mensajeError =
        error.response?.data?.message ||
        "No se pudo guardar el producto.";

      setError(mensajeError);
    } finally {
      setGuardando(false);
    }
  };

  const manejarEliminarProducto = async (
    producto: Product
  ) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${producto.name}"?`
    );

    if (!confirmar) {
      return;
    }

    setMensaje("");
    setError("");

    try {
      setEliminando(true);

      await eliminarProducto(producto.id);

      setProductos(
        (productosActuales) =>
          productosActuales.filter(
            (productoActual) =>
              productoActual.id !== producto.id
          )
      );

      setMensaje(
        "Producto eliminado correctamente."
      );
    } catch (error: any) {
      console.error(
        "Error al eliminar producto:",
        error
      );

      const mensajeError =
        error.response?.data?.message ||
        "No se pudo eliminar el producto.";

      setError(mensajeError);
    } finally {
      setEliminando(false);
    }
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1>Productos</h1>

        <p>
          Consulta y administra los productos
          registrados en Stock Nova. 
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        <input
          type="text"
          placeholder="Escribe aquí para buscar..."
          value={busqueda}
          onChange={(event) =>
            setBusqueda(event.target.value)
          }
          style={{
            width: "300px",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            outline: "none"
          }}
        />

        <button
          type="button"
          onClick={limpiarBusqueda}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Limpiar
        </button>

        <button
          type="button"
          onClick={abrirFormularioCrear}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background: "#1f2937",
            color: "white",
            fontWeight: "bold"
          }}
        >
          Nuevo producto
        </button>
      </div>

      {mensaje && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px",
            background: "#dcfce7",
            color: "#166534",
            borderRadius: "8px"
          }}
        >
          {mensaje}
        </div>
      )}

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px",
            background: "#fee2e2",
            color: "#991b1b",
            borderRadius: "8px"
          }}
        >
          {error}
        </div>
      )}

      {mostrarFormulario && (
        <div
          className="dashboard-card"
          style={{
            marginBottom: "20px"
          }}
        >
          <h2>
            {productoEditando
              ? "Editar producto"
              : "Nuevo producto"}
          </h2>

          <form onSubmit={manejarGuardarProducto}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "16px"
              }}
            >
              <div>
                <label
                  htmlFor="nombre"
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold"
                  }}
                >
                  Nombre
                </label>

                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(event) =>
                    setNombre(
                      event.target.value
                    )
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border:
                      "1px solid #d1d5db",
                    borderRadius: "8px"
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="categoria"
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold"
                  }}
                >
                  Categoría
                </label>

                <select
                  id="categoria"
                  value={categoriaId}
                  onChange={(event) =>
                    setCategoriaId(
                      event.target.value
                    )
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border:
                      "1px solid #d1d5db",
                    borderRadius: "8px"
                  }}
                >
                  <option value="">
                    Seleccionar categoría
                  </option>

                  {categorias.map(
                    (categoria) => (
                      <option
                        key={categoria.id}
                        value={categoria.id}
                      >
                        {categoria.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div
                style={{
                  gridColumn: "1 / -1"
                }}
              >
                <label
                  htmlFor="descripcion"
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold"
                  }}
                >
                  Descripción
                </label>

                <textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(event) =>
                    setDescripcion(
                      event.target.value
                    )
                  }
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border:
                      "1px solid #d1d5db",
                    borderRadius: "8px",
                    resize: "vertical"
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="precio"
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold"
                  }}
                >
                  Precio
                </label>

                <input
                  id="precio"
                  type="number"
                  min="0"
                  step="0.01"
                  value={precio}
                  onChange={(event) =>
                    setPrecio(
                      event.target.value
                    )
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border:
                      "1px solid #d1d5db",
                    borderRadius: "8px"
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="stock"
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold"
                  }}
                >
                  Stock
                </label>

                <input
                  id="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={stock}
                  onChange={(event) =>
                    setStock(
                      event.target.value
                    )
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border:
                      "1px solid #d1d5db",
                    borderRadius: "8px"
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="stockMinimo"
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold"
                  }}
                >
                  Stock mínimo
                </label>

                <input
                  id="stockMinimo"
                  type="number"
                  min="0"
                  step="1"
                  value={stockMinimo}
                  onChange={(event) =>
                    setStockMinimo(
                      event.target.value
                    )
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border:
                      "1px solid #d1d5db",
                    borderRadius: "8px"
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px"
              }}
            >
              <button
                type="submit"
                disabled={
                  guardando || eliminando
                }
                style={{
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "8px",
                  cursor:
                    guardando || eliminando
                      ? "not-allowed"
                      : "pointer",
                  background: "#1f2937",
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                {guardando
                  ? "Guardando..."
                  : productoEditando
                    ? "Actualizar producto"
                    : "Guardar producto"}
              </button>

              <button
                type="button"
                onClick={cerrarFormulario}
                disabled={
                  guardando || eliminando
                }
                style={{
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <p>
        Búsqueda actual:{" "}
        <strong>
          {busqueda || "ninguna"}
        </strong>
      </p>

      {cargando && (
        <div className="dashboard-card">
          <p>Cargando productos...</p>
        </div>
      )}

      {!cargando && !error && (
        <div className="dashboard-card">
          <p>
            Mostrando{" "}
            <strong>
              {productosFiltrados.length}
            </strong>{" "}
            de{" "}
            <strong>
              {productos.length}
            </strong>{" "}
            productos.
          </p>

          {productosFiltrados.length === 0 ? (
            <p>
              {productos.length === 0
                ? "No hay productos registrados."
                : "No se encontraron productos con esa búsqueda."}
            </p>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Stock mínimo</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productosFiltrados.map(
                  (producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>

                      <td>{producto.name}</td>

                      <td>
                        {producto.description ||
                          "Sin descripción"}
                      </td>

                      <td>
                        RD${" "}
                        {Number(
                          producto.price
                        ).toLocaleString(
                          "es-DO",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }
                        )}
                      </td>

                      <td>{producto.stock}</td>

                      <td>
                        {producto.minStock}
                      </td>

                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap"
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              abrirFormularioEditar(
                                producto
                              )
                            }
                            disabled={
                              eliminando
                            }
                            style={{
                              padding:
                                "8px 12px",
                              border: "none",
                              borderRadius:
                                "6px",
                              cursor:
                                eliminando
                                  ? "not-allowed"
                                  : "pointer"
                            }}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              manejarEliminarProducto(
                                producto
                              )
                            }
                            disabled={
                              eliminando
                            }
                            style={{
                              padding:
                                "8px 12px",
                              border: "none",
                              borderRadius:
                                "6px",
                              cursor:
                                eliminando
                                  ? "not-allowed"
                                  : "pointer",
                              background:
                                "#dc2626",
                              color: "white",
                              fontWeight: "bold"
                            }}
                          >
                            {eliminando
                              ? "Eliminando..."
                              : "Eliminar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Products;