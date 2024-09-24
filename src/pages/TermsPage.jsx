import React from 'react';
import Header from '../components/Header/Header';
import "../styles/TermsPage.css"

const TermsPage = () => {
  return (
    <div className='terms-page'>
      <div className='terms-content'>
        <div className='terms-header'>
          <h1 className='terms-title'>Terms</h1>
          <h2 className='terms-subtitle'>Terms and Conditions</h2>
          <p className='terms-description'>Here you can see terms and conditions for rent vehicles our agency CarGo</p>
        </div>
      </div>
      <div className="terms-main">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li className="sidebar-item">
                <a href="#offmain" className="sidebar-link">Driving off the main roads</a>
              </li>
              <li className="sidebar-item">
                <a href="#general" className="sidebar-link">General Provisions</a>
              </li>
              <li className="sidebar-item">
                <a href="#data" className="sidebar-link">Data Protection</a>
              </li>
              <li className="sidebar-item">
                <a href="#reservation" className="sidebar-link">Reservation</a>
              </li>
              <li className="sidebar-item">
                <a href="#payment" className="sidebar-link">Payment</a>
              </li>
              <li className="sidebar-item">
                <a href="#price" className="sidebar-link">Price</a>
              </li>
              <li className="sidebar-item">
                <a href="#requirements" className="sidebar-link">Requirements for Customer</a>
              </li>
              <li className="sidebar-item">
                <a href="#pickup" className="sidebar-link">Pick up and drop off</a>
              </li>
              <li className="sidebar-item">
                <a href="#security" className="sidebar-link">Credit card purchase security statement</a>
              </li>
              <li className="sidebar-item">
                <a href="#privacy" className="sidebar-link">Privacy statement</a>
              </li>
              <li className="sidebar-item">
                <a href="#outside" className="sidebar-link">Using a car outside of borders of Montenegro</a>
              </li>
              <li className="sidebar-item">
                <a href="#other" className="sidebar-link">Other provisions</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          <header className="main-header">
            <h1 className="main-title">Terms and Conditions</h1>
          </header>

          <section id="offmain" className="section">
            <h2 className="section-title">Driving off the main roads</h2>
            <p className="section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </section>

          <section id="general" className="section">
            <h2 className="section-title">General Provisions</h2>
            <p className="section-text">All payments must be made prior to using the service...</p>
          </section>

          <section id="data" className="section">
            <h2 className="section-title">Data Protection</h2>
            <p className="section-text">Reservations can be canceled up to 48 hours...</p>
          </section>

          <section id="reservation" className="section">
            <h2 className="section-title">Reservation</h2>
            <p className="section-text">We respect your privacy and ensure that all personal data is securely processed...</p>
          </section>

          <section id="payment" className="section">
            <h2 className="section-title">Payment</h2>
            <p className="section-text">We respect your privacy and ensure that all personal data is securely processed...</p>
          </section>

          <section id="price" className="section">
            <h2 className="section-title">Price</h2>
            <p className="section-text">We respect your privacy and ensure that all personal data is securely processed...</p>
          </section>

          <section id="requirements" className="section">
            <h2 className="section-title">Requirements for Customer</h2>
            <p className="section-text">We respect your privacy and ensure that all personal data is securely processed...</p>
          </section>

          <section id="pickup" className="section">
            <h2 className="section-title">Pick up and drop off</h2>
            <p className="section-text">We respect your privacy and ensure that all personal data is securely processed...</p>
          </section>

          <section id="security" className="section">
            <h2 className="section-title">Credit card purchase security statement</h2>
            <p className="section-text">We respect your privacy and ensure that all personal data is securely processed...</p>
          </section>

          <section id="privacy" className="section">
            <h2 className="section-title">Privacy statement</h2>
            <p className="section-text">We respect your privacy and ensure that all personal data is securely processed...</p>
          </section>

          <section id="outside" className="section">
            <h2 className="section-title">Using a car outside of borders of Montenegro</h2>
            <p className="section-text">We respect your privacy and ensure that all personal data is securely processed...</p>
          </section>

          <section id="other" className="section">
            <h2 className="section-title">Other provisions</h2>
            <p className="section-text">We respect your privacy and ensure that all personal data is securely processed...</p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsPage;
