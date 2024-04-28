import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(response.data.message);
      navigateTo("/appointment");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-icon">DOSCHEDULISE</div>
      </div>
      <div className="mainContainer container">
        <div className="image-container">
          <img
            src="https://t4.ftcdn.net/jpg/03/30/33/29/360_F_330332917_MO0x1tcYedbGxUM4wgATwyOkU7xY5wEI.jpg"
            alt="Doctor"
            className="doctor-image"
          />
        </div>
        <div className="form-container">
          <form className="form" onSubmit={handleLogin}>
            <p className="title">Login</p>
            <p className="message">Login now to access our app.</p>
            <div className="flex">
              <label>
                <input
                  required
                  placeholder="Email"
                  type="email"
                  className="input"
                  value={email}
                  id="LoginInput"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="flex">
              <label>
                <input
                  required
                  placeholder="Password"
                  type="password"
                  className="input"
                  id="LoginInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              </div>
            <button type="submit" className="submit" id="LoginSubmit">
              Submit
            </button>
            <p className="signin">
              Don't have an account? <Link to="/register">Register now</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
