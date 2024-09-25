import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./Pages/Login.jsx";
import Profile from "./Pages/Profile.jsx";
import Join from "./components/Join/Join.jsx";
import Chat from "./components/Chat/Chat.jsx";
import DocDashboard from "./components/DoctorsDashboard.jsx";
import Doctor from "./Pages/Doctor.jsx";
import AppointmentConfirm from "./components/AppointmentConfirm.jsx";
import ContactMe from "./components/ContactMe.jsx";
import { useEffect } from "react";
import axios from "axios";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";

const App = () => {
  useEffect(() => {
    const pollBackend = () => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/user/keepActive`)
        .then(response => {
          console.log('Backend is alive:', response.data);
        })
        .catch(error => {
          console.error('Error polling backend:', error);
        });
    };

    pollBackend();

    const intervalId = setInterval(pollBackend, 1200000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/appointment" element={<ProtectedRoutes><Appointment /></ProtectedRoutes>} />
        <Route path="/about" element={<ProtectedRoutes><AboutUs /></ProtectedRoutes>} />
        <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path="/docdashboard" element={<ProtectedRoutes><DocDashboard /></ProtectedRoutes>} />
        <Route path="/appointment/thankyou" element={<ProtectedRoutes><AppointmentConfirm /></ProtectedRoutes>} />
        <Route path="/doctors" element={<ProtectedRoutes><Doctor /></ProtectedRoutes>} />
        <Route path="/contactme" element={<ProtectedRoutes><ContactMe /></ProtectedRoutes>} />
        <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
        <Route path="/join" element={<ProtectedRoutes><Join /></ProtectedRoutes>} />
        <Route path="/chat" element={<ProtectedRoutes><Chat /></ProtectedRoutes>} />
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
};

export default App;
