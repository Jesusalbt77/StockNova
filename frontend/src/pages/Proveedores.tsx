import { useEffect, useState } from "react";
import {
  createSupplier,
  deleteSupplier,
  getSuppliers,
  updateSupplier,
  type Supplier,
} from "../services/Supplier Service";

const Proveedores = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(
    null
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const cargarProveedores = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los proveedores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  const limpiarFormulario = () => {
    setName("");
    setEmail("");
    setPhone("");
    setEditingSupplier(null);
  };

  const abrirFormularioCrear = () => {
    limpiarFormulario();
    setShowForm(true);
  };

  const abrirFormularioEditar = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setName(supplier.name);
    setEmail(supplier.email ?? "");
    setPhone(supplier.phone ?? "");
    setShowForm(true);
  };

  const cerrarFormulario = () => {
    limpiarFormulario();
    setShowForm(false);
  };

  const guardarProveedor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("El nombre del proveedor es obligatorio.");
      return;
    }

    try {
      setError("");

      if (editingSupplier) {
        await updateSupplier(editingSupplier.id, {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        });
      } else {
        await createSupplier({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        });
      }

      cerrarFormulario();
      await cargarProveedores();
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el proveedor.");
    }
  };

  const eliminarProveedor = async (id: number) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este proveedor?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setError("");

      await deleteSupplier(id);
      await cargarProveedores();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el proveedor.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Proveedores</h1>
          <p>Administra los proveedores de StockNova.</p>
        </div>

        <button onClick={abrirFormularioCrear}>
          + Nuevo proveedor
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showForm && (
        <div className="form-card">
          <h2>
            {editingSupplier
              ? "Editar proveedor"
              : "Nuevo proveedor"}
          </h2>

          <form onSubmit={guardarProveedor}>
            <div className="form-group">
              <label htmlFor="supplier-name">
                Nombre
              </label>

              <input
                id="supplier-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del proveedor"
              />
            </div>

            <div className="form-group">
              <label htmlFor="supplier-email">
                Correo electrónico
              </label>

              <input
                id="supplier-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="supplier-phone">
                Teléfono
              </label>

              <input
                id="supplier-phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="809-555-1234"
              />
            </div>

            <div className="form-actions">
              <button type="submit">
                {editingSupplier
                  ? "Guardar cambios"
                  : "Crear proveedor"}
              </button>

              <button
                type="button"
                onClick={cerrarFormulario}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="content-card">
        {loading ? (
          <p>Cargando proveedores...</p>
        ) : suppliers.length === 0 ? (
          <div className="empty-state">
            <h3>No hay proveedores</h3>
            <p>
              Todavía no has registrado ningún proveedor.
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.id}</td>

                    <td>{supplier.name}</td>

                    <td>
                      {supplier.email || "No especificado"}
                    </td>

                    <td>
                      {supplier.phone || "No especificado"}
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          abrirFormularioEditar(supplier)
                        }
                      >
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          eliminarProveedor(supplier.id)
                        }
                      >
                        Eliminar
                      </button>
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
};

export default Proveedores;