import { useState } from "react";
import "./App.css";
import IDEPage from "./pages/IDEPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/idepage" element={<IDEPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
