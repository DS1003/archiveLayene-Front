import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';

// Lazy load the Dashboard component
const Dashboard = lazy(() => import('./components/Dashboard'));
const Home = lazy(() => import('./components/Home'));
const About  = lazy(() => import('./components/About'));
const Register = lazy(() => import('./components/Register'));
const AppRoutes = () => {
  
  return (
    <Suspense fallback={<div className='spinner'>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
