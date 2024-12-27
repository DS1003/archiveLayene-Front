import Loader from '../src/components/ui/Loader.js';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Utilitaire pour ajouter un délai artificiel
const withDelay = (importFunction: () => Promise<any>, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(importFunction());
    }, delay);
  });
};

// Lazy load avec délai de 1 secondes
const Dashboard = lazy(() => withDelay(() => import('./components/Dashboard'), 1000));
const Home = lazy(() => withDelay(() => import('./components/Home'), 1000));
const About = lazy(() => withDelay(() => import('./components/About'), 1000));
const Login = lazy(() => withDelay(() => import('./components/Login'), 1000));
const Register = lazy(() => withDelay(() => import('./components/Register'), 1000));
const ArticlePage = lazy(() => withDelay(() => import('./components/ArticlePage'), 1000));


const AppRoutes = () => {
  
  return (
    <Suspense fallback={ <Loader /> } >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
