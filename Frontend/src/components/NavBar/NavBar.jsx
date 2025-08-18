import React, { useContext, useState, useEffect } from "react";
import style from "./NavBar.module.css";
import logo from "../../assets/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { FiPhoneCall, FiMenu, FiX } from "react-icons/fi";
import { BsSearch, BsSun, BsMoon, BsWhatsapp } from "react-icons/bs";
import { MdEmail, MdPhone } from "react-icons/md";
import { ThemeContext } from "../../context/Theme/ThemeContext";

const s = style;

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear search after navigation
      setMenuOpen(false); // Close mobile menu if open
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Real-time search - navigate immediately as user types
    if (value.trim()) {
      navigate(`/products?search=${encodeURIComponent(value.trim())}`);
    } else {
      // If search is empty, go to products page without search
      navigate('/products');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className={s.topBar} data-theme={theme.text}>
        <div className={s.topBarContent}>
          <div className={s.contactInfo}>
            <a href="mailto:info@freshberryuae.com" className={s.emailLink}>
              <MdEmail />
              <span>info@freshberryuae.com</span>
            </a>
            <div className={s.phoneLinks}>
              <a href="tel:+971585878022" className={s.phoneLink}>
                <MdPhone />
                <span>+971 58 587 8022</span>
              </a>
              <a 
                href="https://wa.me/971585878022" 
                target="_blank" 
                rel="noopener noreferrer"
                className={s.whatsappLink}
              >
                <BsWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={s.navBar} data-theme={theme.text}>
      <NavLink to="/" className={s.logo} onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="Fresh Berry Logo" />
      </NavLink>

      <div className={s.searchWrapper}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch} type="button">
          <BsSearch />
        </button>
      </div>

      <div className={`${s.btns} ${menuOpen ? s.open : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <div 
          className={s.productsDropdown}
          onMouseEnter={() => !isMobile && setShowProductDropdown(true)}
          onMouseLeave={() => !isMobile && setShowProductDropdown(false)}
          onClick={() => isMobile && setShowProductDropdown(!showProductDropdown)}
        >
          <NavLink to="/products" onClick={() => !isMobile && setMenuOpen(false)}>
            Products
          </NavLink>
          {((showProductDropdown && !isMobile) || (showProductDropdown && isMobile)) && categories.length > 0 && (
            <div className={s.dropdownMenu} data-theme={theme.text}>
              <NavLink 
                to="/products" 
                onClick={() => {setMenuOpen(false); setShowProductDropdown(false);}}
                className={s.dropdownItem}
              >
                All Products
              </NavLink>
              {categories.map((category) => (
                <NavLink
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  onClick={() => {setMenuOpen(false); setShowProductDropdown(false);}}
                  className={s.dropdownItem}
                >
                  {category}
                </NavLink>
              ))}
            </div>
          )}
        </div>
        <NavLink to="/horeca-supply" onClick={() => setMenuOpen(false)}>
          HoReCa Supply
        </NavLink>
        <NavLink to="/qoute" onClick={() => setMenuOpen(false)}>
          Request a Quote
        </NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>
          About Us
        </NavLink>
          {/* <NavLink to="/admin/login" onClick={() => setMenuOpen(false)}>
          Admin
        </NavLink> */}
        <NavLink
          to="/contact"
          onClick={() => setMenuOpen(false)}
          className={s.mobileContact}
        >
          Contact Us
        </NavLink>
      </div>

      <div className={s.con}>
        <div
          className={s.toggle}
          onClick={toggleTheme}
          title={
            theme.text === "#fff"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {theme.text === "#fff" ? <BsMoon /> : <BsSun />}
        </div>

        <div className={s.contact}>
          <NavLink to="/contact" className={s.contactbtn}>
            <FiPhoneCall /> Contact Us
          </NavLink>
        </div>

        {/* Hamburger Icon */}
        <div className={s.menuIcon} onClick={toggleMenu}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
      </div>
      </div>
    </>
  );
};

export default NavBar;
