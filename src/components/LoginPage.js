import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";

function LoginPage() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Please enter both username and password.");
        return;
      }

      const response = await axios.post("http://localhost:8080/auth/signin", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      const { jwt, role } = response.data;

      // Store token and role in localStorage
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("role", role);
      if (role === "ROLE_STUDENT") {
        navigate("/student");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="border rounded-lg p-4"
        style={{ width: "500px", height: "auto" }}
      >
        <MDBContainer className="p-3">
          <h2 className="mb-4 text-center">Login Page</h2>
          <MDBInput
            wrapperClass="mb-4"
            placeholder="Email address"
            id="email"
            value={email}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-danger">{error}</p>}{" "}
          {/* Render error message if exists */}
          <button
            className="mb-4 d-block btn-primary"
            style={{ height: "50px", width: "100%" }}
            onClick={handleLogin}
          >
            Sign in
          </button>
          <div className="text-center">
            <p>
              Not a member? <a href="/signup">Register</a>
            </p>
          </div>
        </MDBContainer>
      </div>
    </div>
  );
}

export default LoginPage;
