import Welcome from "./components/Welcome";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AboutUs from "./components/About Us/AboutUs";
import Contact from "./components/ContactUs/Contact";
import Products from "./components/Products/Products";
import HorecaSupply from "./components/HorecaSupply/HorecaSupply";
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/horeca-supply" element={<HorecaSupply />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
