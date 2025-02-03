// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import PortfolioPage from './pages/PortfolioPage';
import BusinessCardPage from './pages/BusinessCardPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:username" element={<PortfolioPage />} />
        <Route path="/:username/card" element={<BusinessCardPage />} />
      </Routes>
    </Router>
  );
}

export default App;