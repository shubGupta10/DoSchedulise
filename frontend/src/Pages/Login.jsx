import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Loader from "../components/Loader"; 
import Cookies from 'js-cookie'
import UserContext from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const { user, setToken, loading } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "Doctor") {
        navigate("/docdashboard");
      } else if (user.role === "Patient") {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const loginEndpoint = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`;

      const response = await axios.post(
        loginEndpoint,
        { email, password },
        { 
          headers: { "Content-Type": "application/json" },
          withCredentials: true 
        }
      );

      const token = Cookies.get('token');

      if (response && response.data) {
        toast.success(response.data.message);
        localStorage.setItem("token", token);
        setToken(token); 
      } else {
        throw new Error("Invalid response received from the server.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setIsLoading(false); 
    }
  };

  if (loading || isLoading) {
    return <Loader />;
  }

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
                  id="LoginInputPass"
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