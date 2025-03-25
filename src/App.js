import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import Dashboard from "./components/Dashboard";
import StudentPage from "./components/StudentPage";
import Materialst from "./components/Materialst";
import Materialss from "./components/Materialss";
import Material from "./components/Material";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/materialsteacher" element={<Materialst />} />
          <Route path="/materialsstudent" element={<Materialss />} />
          <Route path="/material" element={<Material />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
