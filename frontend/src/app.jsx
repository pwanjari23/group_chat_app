import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome";
import Login from "./pages/login";
import Signup from "./pages/signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
