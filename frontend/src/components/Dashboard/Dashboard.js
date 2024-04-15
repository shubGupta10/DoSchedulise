import React from 'react';
import './Dashboard.css';

export const Dashboard = () => {
  return (
    <>
      <div className="Container">
        <nav>
          <div className="newNavbar">
            <div className="logo">
              <img src="/pic/logo.jpg" alt="" />
              <h1 className="logoName">DocSchedulize</h1>
            </div>
            <ul>
              <li><a href="#">
                <i className="fas fa-calendar-alt"></i>
                <span className="nav-item">Appointments</span>
              </a>
              </li>
              <br />
              <li><a href="#">
                <i className="fas fa-user"></i>
                <span className="nav-item">Patients</span>
              </a>
              </li>
              <br />
              <li><a href="#">
                <i className="fas fa-user-md"></i>
                <span className="nav-item">Doctors</span>
              </a>
              </li>
              <br />
              <li><a href="#">
                <i className="fas fa-hospital"></i>
                <span className="nav-item">Facilities</span>
              </a>
              </li>
              <br />
              <li><a href="#" className="logout">
                <i className="fas fa-sign-out-alt"></i>
                <span className="nav-item">Logout</span>
              </a>
              </li>
            </ul>
          </div>
        </nav>

        <section className="main">
          <div className="main-top">
            <p>Welcome to DocSchedulize Dashboard!</p>
          </div>
          <div className="main-body">
            <h1>Recent Appointments</h1>
          
            <div className="search_bar">
              <input type="search" placeholder="Search appointments here..." />
              <select name="" id="">
                <option>Category</option>
                <option>General Checkup</option>
                <option>Specialist Consultation</option>
                <option>Diagnostic Test</option>
              </select>
              <select className="filter">
                <option>Filter</option>
              </select>
            </div>

            <div className="tags_bar">
              <div className="tag">
                <i className="fas fa-times"></i>
                <span>General</span>
              </div>
              <div className="tag">
                <i className="fas fa-times"></i>
                <span>Checkup</span>
              </div>
              <div className="tag">
                <i className="fas fa-times"></i>
                <span>Follow-up</span>
              </div>
              <div className="tag">
                <i className="fas fa-times"></i>
                <span>Orthopedic</span>
              </div>
            </div>

            <div className="row">
              <p>You have <span>20</span> upcoming appointments</p>
              <a href="#">View all</a>
            </div>

            {/* Sample appointment cards */}
            {/* Replace this with dynamic content from your database */}
            <div className="appointment_card">
              <div className="appointment_details">
                <div className="img">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="text">
                  <h2>Dr. Smith</h2>
                  <span>General Checkup</span>
                </div>
              </div>
              <div className="appointment_time">
                <h4>Monday, 20th April 2024, 10:00 AM</h4>
                <span>1 day from now</span>
              </div>
            </div>
            
            <div className="appointment_card">
              <div className="appointment_details">
                <div className="img">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="text">
                  <h2>Dr. Johnson</h2>
                  <span>Specialist Consultation</span>
                </div>
              </div>
              <div className="appointment_time">
                <h4>Tuesday, 21st April 2024, 2:30 PM</h4>
                <span>2 days from now</span>
              </div>
            </div>

            {/* More appointment cards can be added here */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
