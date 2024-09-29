import React, { useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../../styles/header.css";
import logo from "../../assets/all-images/logo.png"; // Uvezi svoj logo

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/cars", display: "Cars" },
  { path: "/blogs", display: "Blog" },
  { path: "/contact", display: "Contact" },
  { path: "/termspage", display: "Terms" },
];

const Header = () => {
  const menuRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const handleLogout = () => {
    // Logika za logout (npr. brisanje tokena)
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
                <Link to="/login" className="d-flex align-items-center gap-1">
                  <i className="ri-login-circle-line"></i> Login
                </Link>

                <Link
                  to="/register"
                  className="d-flex align-items-center gap-1"
                >
                  <i className="ri-user-line"></i> Register
                </Link>

                <div className="user-icon" onClick={toggleDropdown}>
                  <FaUserCircle size={24} />
                  {dropdownOpen && (
                    <div
                      className={`dropdown-menu ${
                        dropdownOpen ? "active" : ""
                      }`}
                    >
                      <Link to="/profile">View Profile</Link>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* middle header */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className="d-flex align-items-center gap-1">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <span className="logo-text">
                      Rent a Car <br /> Go
                    </span>
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

            <Col
              lg="2"
              md="3"
              sm="0"
              className="d-flex align-items-center justify-content-end"
            >
              <button className="header__btn btn">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* main navigation */}
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
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
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
