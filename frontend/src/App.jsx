import Header from "./components/Header";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ManageCategory from "./pages/ManageCategory";
import ManageItems from "./pages/ManageItems";
import ManageUsers from "./pages/ManageUsers";
import OrderHistory from "./pages/OrderHistory";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

function App() {
  const { auth } = useContext(AppContext);
  const location = useLocation();

  // Redirect to home if already logged in
  const LoginRoute = ({ element }) => {
    return auth?.token ? <Navigate to="/" replace /> : element;
  };

  // Protect route and restrict by role
  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!auth?.token) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/" replace />;
    }
    return element;
  };

  return (
    <div className="h-screen">
      {/* Hide header on login page */}
      {location.pathname !== "/login" && <Header />}

      <Toaster position="top-center" reverseOrder={false} />

      <div className="h-[calc(100vh-120px)] overflow-y-scroll overflow-x-hidden">
        <Routes>
          {/* Public + Authenticated Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/order-history" element={<OrderHistory />} />

          {/* Admin Only Routes */}
          <Route
            path="/manage-categories"
            element={
              <ProtectedRoute
                element={<ManageCategory />}
                allowedRoles={["ROLE_ADMIN"]}
              />
            }
          />
          <Route
            path="/manage-items"
            element={
              <ProtectedRoute
                element={<ManageItems />}
                allowedRoles={["ROLE_ADMIN"]}
              />
            }
          />
          <Route
            path="/manage-users"
            element={
              <ProtectedRoute
                element={<ManageUsers />}
                allowedRoles={["ROLE_ADMIN"]}
              />
            }
          />

          {/* Login Route */}
          <Route path="/login" element={<LoginRoute element={<Login />} />} />

          {/* 404 */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;