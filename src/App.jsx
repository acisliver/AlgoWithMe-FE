import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SigninPage from './components/pages/AuthPage/SigninPage';
import SignupPage from './components/pages/AuthPage/SignupPage';
import HomePage from './components/pages/HomePage';
import IDEPage from './components/pages/IDEPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/problems/:problemId" element={<IDEPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
