import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom'; 
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routers/Routers';

const Layout = () => {
  const location = useLocation(); 

  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <Fragment>
      {!hideHeaderFooter && <Header />} 
      <div>
        <Routers />
      </div>
      {!hideHeaderFooter && <Footer />} 
    </Fragment>
  );
}

export default Layout;
