import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Stock Nova</h2>
        <p>Gestión de inventario</p>
      </div>

      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Productos
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Categorías
        </NavLink>

        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Inventario
        </NavLink>

        <NavLink
          to="/suppliers"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Proveedores
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;