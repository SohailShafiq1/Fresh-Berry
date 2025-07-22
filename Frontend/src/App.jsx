import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import AboutUs from "./components/About Us/AboutUs";
import Contact from "./components/ContactUs/Contact";
import Products from "./components/Products/Products";
import HorecaSupply from "./components/HorecaSupply/HorecaSupply";
import Admin from "./components/Admin/Admin";
import Qoute from "./components/Qoute/Qoute";
import { ThemeProvider } from "./context/Theme/ThemeContext";

function App() {
  return (
    <ThemeProvider>
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
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
