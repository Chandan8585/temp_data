import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Cookies from "js-cookie"; 
import './Login.css'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });

      const token = response.data.token;
      Cookies.set("token", token, { expires: 100 });
      localStorage.setItem("token", token);
      navigate("/"); 
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Invalid credentials");
      } else {
        setErrorMessage("Network error, please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center">Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
