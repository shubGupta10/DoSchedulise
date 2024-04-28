import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx"
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./Pages/Login.jsx";

const App = () => {


  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/v1/user/patient/me",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setIsAuthenticated(true);
  //       setUser(response.data.user);
  //     } catch (error) {
  //       setUser({});
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
