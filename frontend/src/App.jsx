  import { useState } from "react";
  import "./App.css";
  import IDEPage from "./pages/IDEPage";
  import LoginPage from "./pages/LoginPage/components/login";
  import SignUpPage from "./pages/LoginPage/components/signup"

  import { Routes, Route, BrowserRouter } from "react-router-dom";

  function App() {
    const [count, setCount] = useState(0);

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/idepage" element={<IDEPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
