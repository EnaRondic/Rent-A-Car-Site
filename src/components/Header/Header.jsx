import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../../styles/header.css";
import logo from "../../assets/all-images/logo.png";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/cars", display: "Cars" },
  { path: "/blogs", display: "Blog" },
  { path: "/contact", display: "Contact" },
  { path: "/termspage", display: "Terms" },
  { path: "/my-reservations", display: "My reservations" },
  { path: "/kanban", display: "Kanban" },
];

const Header = () => {
  const menuRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // User state to manage user information
  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const fetchUserProfile = async () => {
        const token = localStorage.getItem("authToken");
      
        if (!token) {
          console.log("No token found!");
          return;
        }
      
        try {
          const response = await fetch(`http://tim4.cortexakademija.com/api/user`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,  // Koristi Bearer token u headeru
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) throw new Error('Failed to fetch profile data');
          const data = await response.json();
          setUser(data); // Spasi korisničke podatke u state
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      

      fetchUserProfile();
    }
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/login");
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +38269789564
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right">
                {/* Show Login/Register if user is not logged in */}
                {!user ? (
                  <>
                    <Link to="/login" className="d-flex align-items-center gap-1">
                      <i className="ri-login-circle-line"></i> Login
                    </Link>

                    <Link to="/register" className="d-flex align-items-center gap-1">
                      <i className="ri-user-line"></i> Register
                    </Link>
                  </>
                ) : (
                  <div className="user-icon" onClick={toggleDropdown}>
                    <FaUserCircle size={24} />
                    <span className="user-name">{user.name}</span>
                    {dropdownOpen && (
                      <div className={`dropdown-menu ${dropdownOpen ? "active" : ""}`}>
                        <Link to="/profile">View Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Middle header */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className="d-flex align-items-center gap-1">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <span className="logo-text">Rent a Car <br /> Go</span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Montenegro</h4>
                  <h6>Podgorica, Montenegro</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col lg="2" md="3" sm="0" className="d-flex align-items-center justify-content-end">
              <button className="header__btn btn">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main navbar */}
      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) => navClass.isActive ? "nav__active nav__item" : "nav__item"}
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
