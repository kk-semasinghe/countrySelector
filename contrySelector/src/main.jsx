// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landingPage';
import CountryList from './pages/countryList';
import CountryDetailsPage from './pages/countryDetailsPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/countryList" element={<CountryList />} />
        <Route path="/countryDetailsPage/:name" element={<CountryDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
