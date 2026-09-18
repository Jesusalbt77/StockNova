import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Categories from "./pages/Categories";
import Login from "./pages/Login";

import Sidebar from "./components/Sidebar";
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
                      path="*"
                      element={<Dashboard />}
                    />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;