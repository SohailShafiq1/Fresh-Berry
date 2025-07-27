import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import AboutUs from "./components/About Us/AboutUs";
import Contact from "./components/ContactUs/Contact";
import Products from "./components/Products/Products";
import HorecaSupply from "./components/HorecaSupply/HorecaSupply";
import Qoute from "./components/Qoute/Qoute";
import { ThemeProvider } from "./context/Theme/ThemeContext";
import { AdminAuthProvider } from "./context/Theme/AdminAuthContext";
import Login from "./Admin/Login/Login";
import AdminHome from "./Admin/AdminHome/AdminHome";
import AdminRoute from "./Admin/AdminRoute/AdminRoute";
import AdminQoute from "./Admin/AdminQoute/AdminQoute";
import AdminProducts from "./Admin/AdminProducts/AdminProducts";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <ThemeProvider>
      <AdminAuthProvider>
        
        <div className="App">
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/horeca-supply" element={<HorecaSupply />} />
              <Route path="/qoute" element={<Qoute />} />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin/home"
                element={
                  <AdminRoute>
                    <AdminHome />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/quotes"
                element={
                  <AdminRoute>
                    <AdminQoute />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                }
              />
              {/* Catch-all route for unknown URLs */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </AdminAuthProvider>
    </ThemeProvider>
  );
}

export default App;
