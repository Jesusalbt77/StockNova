import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          SN
        </div>

        <div>
          <h2>Stock Nova</h2>
          <p>Gestión de inventario</p>
        </div>
      </div>

      <div className="sidebar-section-title">
        MENÚ PRINCIPAL
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 13h8V3H3v10Z" />
              <path d="M13 21h8v-8h-8v8Z" />
              <path d="M13 3h8v6h-8V3Z" />
              <path d="M3 17h8v4H3v-4Z" />
            </svg>
          </span>

          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m21 8-9-5-9 5 9 5 9-5Z" />
              <path d="m3 12 9 5 9-5" />
              <path d="m3 16 9 5 9-5" />
            </svg>
          </span>

          <span>Productos</span>
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 5h16v4H4z" />
              <path d="M4 11h16v4H4z" />
              <path d="M4 17h10v2H4z" />
            </svg>
          </span>

          <span>Categorías</span>
        </NavLink>

        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 3v18" />
              <path d="m7 8 5-5 5 5" />
              <path d="m17 16-5 5-5-5" />
            </svg>
          </span>

          <span>Inventario</span>
        </NavLink>

        <NavLink
          to="/suppliers"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 7h11v10H3z" />
              <path d="M14 10h4l3 3v4h-7z" />
              <circle cx="7" cy="19" r="2" />
              <circle cx="18" cy="19" r="2" />
            </svg>
          </span>

          <span>Proveedores</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-status">
          <span className="status-dot" />
          <span>Sistema operativo</span>
        </div>

        <small>Stock Nova v1.0</small>
      </div>
    </aside>
  );
}

export default Sidebar;