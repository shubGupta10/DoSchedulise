import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/patient/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response); 
      toast.success(response.data.message);
      navigateTo("/login"); 
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
    <div class="navbar">
  <div class="nav-icon">DOSCHEDULISE</div>
</div>
    <div className="mainContainer container">
    <div className="image-container">
        <img  src="https://www.shutterstock.com/image-vector/young-doctor-600nw-255583612.jpg" alt="Doctor" className="doctor-image" />
      </div>
      <div className="form-container">
        <form className="form" onSubmit={handleRegistration}>
          <p className="title">Register</p>
          <p className="message">Signup now and get full access to our app.</p>
          <div className="flex">
            <label>
              <input
                required
                placeholder="FirstName"
                type="text"
                className="input"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </label>
            <label>
              <input
                required
                placeholder="Lastname"
                type="text"
                className="input"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </label>
          </div>
          <label>
            <input
              required
              placeholder="Email"
              type="email"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              required
              placeholder="Phone"
              type="tel"
              className="input"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              required
              placeholder="NIC"
              type="text"
              className="input"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              required
              placeholder="Date of Birth"
              type="date"
              className="input"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </label>
          <div className="flex">
            <label>
              <select
                required
                placeholder="Select Gender"
                name="gender"
                className="input"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              <input
                required
                placeholder="Password"
                type="password"
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </div>
          <label>
            <input
              required
              placeholder=""
              type="password"
              className="input"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span>Confirm password</span>
          </label>
          <button type="submit" className="submit">
            Submit
          </button>
          <p className="signin">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
     
    </div>
    </>
  );
};

export default Register;
