import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  const navigate = useNavigate();

    const logout = async () => {
      try {
        await axios.post('http://localhost:5000/api/v1/user/patient/logout');
        toast.success(response.data.message);
        navigate('/');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

  return (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">DOSCHEDULISE</label>
      <ul>
        <li>
          <Link className="active" to="/appointment">
            Appointment
          </Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/">Services</Link>
        </li>
        <li>
          <Link to="/">Contact</Link>
        </li>
        <li>
          <Link to="/"  class="btn btn-danger" onClick={logout}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
