import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import './Login.css'
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mobile , setMobile] = useState("");
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    if(password !== ConfirmPassword){
        setErrorMessage('Password Not Matching');
        return ;
    }else{
        try {
            const response = await axios.post("http://localhost:5001/signup", {
              email,
              mobile,
              password,
            });
            const message = response.data.message;
            alert(message)
            setTimeout(()=>{
              navigate("/login"); 
            }, 3000)
            
          } catch (error) {
            // Handle errors
            if (error.response) {
              setErrorMessage(error.response.data.message || "Invalid credentials");
            } else {
              setErrorMessage("Network error, please try again later.");
            }
          }
    }
 
  };

  return (
    <div className="signup-container">
      <h2 className="text-center">Signup</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSignup} className="signup-form">
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
          <label>Mobile</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
            {errorMessage && <p className="bg-red-500">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
