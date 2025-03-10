import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import CarListing from '../pages/CarListing';
import CarDetails from '../pages/CarDetails';
import Blog from '../pages/Blog';
import BlogDetails from '../pages/BlogDetails';
import NotFound from '../pages/NotFound';
import TermsPage from '../pages/TermsPage';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import KanbanBoard from '../pages/KanbanBoard';
import MyReservations from '../pages/MyReservations'





const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/' element={<Navigate to="/home" />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/cars' element={<CarListing />} />
      <Route path='/cars/:slug' element={<CarDetails />} />
      <Route path='/blogs' element={<Blog />} />
      <Route path='/blogs/:slug' element={<BlogDetails />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='termspage' element={<TermsPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path='/my-reservations' element={<MyReservations />} />
      <Route path="/kanban" element={<KanbanBoard />} />
    </Routes>
  );
};

export default Routers;



