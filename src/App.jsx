import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthPage from './components/pages/AuthPage';
import HomePage from './components/pages/HomePage';
import IDEPage from './components/pages/IDEPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/problems" element={<IDEPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
