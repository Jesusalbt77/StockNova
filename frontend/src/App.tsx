import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Proveedores from "./pages/Proveedores";
import Profile from "./pages/Profile";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app">
                <Sidebar />

                <div className="app-content">
                  <TopBar />

                  <main className="main-content">
                    <Routes>
                      <Route
                        path="/"
                        element={<Dashboard />}
                      />

                      <Route
                        path="/products"
                        element={<Products />}
                      />

                      <Route
                        path="/categories"
                        element={<Categories />}
                      />

                      <Route
                        path="/inventory"
                        element={<Inventory />}
                      />

                      <Route
                        path="/suppliers"
                        element={<Proveedores />}
                      />

                      <Route
                        path="/profile"
                        element={<Profile />}
                      />

                      <Route
                        path="*"
                        element={<Dashboard />}
                      />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;