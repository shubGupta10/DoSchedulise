import React, {useState, useEffect} from 'react';
import "./Dashboard.css"
import Navbar from './Navbar';


const Dashboard = () => {

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/v1/user/doctor/all');
        setDoctors(data.doctors);
      } catch (error) {
        console.error("Error in fetching doctors", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/appointment/getall");
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error in fetching appointments", error);
      }
    };

    fetchAppointments();
  }, []);



  return (
    <>
    <Navbar/>
      <section className="main_custom">
        <div className="main-top_custom">
          <p>Welcome to Scheduler Dashboard!</p>
        </div>
        <div className="main-body_custom">
          <h1>Recent Missions</h1>

          <div className="row_custom">
            <p>You have <span>{appointments.length}</span> upcoming missions</p>
            <a href="#">View all</a>
          </div>

          {/* Sample mission cards */}
          {/* Replace this with dynamic content from your database */}
          <div className="mission_card_custom">
            <div className="mission_details_custom">
              <div className="img_custom text-[#3fbbc0]">
                <i className="fas fa-user-md "></i>
              </div>
              <div className="text_custom">
                <h2>Captain America</h2>
                <span>Rescue Mission</span>
              </div>
            </div>
            <div className="mission_time_custom">
              <h4>Monday, 20th April 2024, 10:00 AM</h4>
              <span>1 day from now</span>
            </div>
          </div>

          <div className="mission_card_custom">
            <div className="mission_details_custom">
              <div className="img_custom">
                <i className="fas fa-user-md"></i>
              </div>
              <div className="text_custom">
                <h2>Spider-Man</h2>
                <span>Combat Mission</span>
              </div>
            </div>
            <div className="mission_time_custom">
              <h4>Tuesday, 21st April 2024, 2:30 PM</h4>
              <span>2 days from now</span>
            </div>
          </div>

          {/* More mission cards can be added here */}
        </div>
      </section>
      </>
  );
};

export default Dashboard;
