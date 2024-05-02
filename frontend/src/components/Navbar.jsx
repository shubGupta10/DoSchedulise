import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('/appointment'); 

  const handleLinkClick = (to) => {
    setActiveLink(to);
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/user/patient/logout');
      toast.success(response.data.message);
      setActiveLink('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">DOSCHEDULISE</label>
      <ul>
        <li>
          <NavLink
            to="/appointment"
            activeClassName="active"
            onClick={() => handleLinkClick('/appointment')}
          >
            Appointment
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            activeClassName="active"
            onClick={() => handleLinkClick('/dashboard')}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/services"
            activeClassName="active"
            onClick={() => handleLinkClick('/services')}
          >
            Doctors
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/services"
            activeClassName="active"
            onClick={() => handleLinkClick('/services')}
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            activeClassName="active"
            onClick={() => handleLinkClick('/profile')}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <Link to="/" className="btn btn-danger" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
