import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { toast } from 'react-toastify';
import UserContext from "../context/UserContext";
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigateTo = useNavigate();
  const [activeLink, setActiveLink] = useState('/appointment'); 

  const handleLinkClick = (to) => {
    setActiveLink(to);
  };

  const userRole = localStorage.getItem('userRole');
  const {setUser} = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    Cookies.remove('token');
    setUser(null); 
    navigateTo("/login");
    toast.success("User logout Successful");
  };

  return (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">DOSCHEDULISE</label>
      <ul>
        {/* Conditionally render Appointment link based on userRole */}
        {userRole !== 'Doctor' && (
          <li>
            <NavLink
              to="/appointment"
              activeClassName="active"
              onClick={() => handleLinkClick('/appointment')}
            >
              Appointment
            </NavLink>
          </li>
        )}
        {/* Conditionally render Dashboard link based on userRole */}
        <li>
          <NavLink
            to={userRole === 'Doctor' ? '/docdashboard' : '/dashboard'}
            activeClassName="active"
            onClick={() => handleLinkClick(userRole === 'Doctor' ? '/docdashboard' : '/dashboard')}
          >
            {userRole === 'Doctor' ? 'DocDashboard' : 'Dashboard'}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            activeClassName="active"
            onClick={() => handleLinkClick('/doctors')}
          >
            Doctors
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/join"
            activeClassName="active"
            onClick={() => handleLinkClick('/join')}
          >
            Live Chat
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
          <NavLink
            to="/contactme"
            activeClassName="active"
            onClick={() => handleLinkClick('/contactme')}
          >
            Contact Me
          </NavLink>
        </li>
        <li>
          <Link to='/login' className="btn btn-danger" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
