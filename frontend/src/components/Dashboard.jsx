import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import "./Dashboard.css";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/appointment/getall"
        );
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, []);


  useEffect(() => {
    const fetchDoctors = async() => {
      try {
        const {data } = await axios.get('http://localhost:5000/api/v1/user/doctor/all');
        setDoctors(data.doctors);
      } catch (error) {
        console.log("Error in fetching doctors", error);
      }
    }

    fetchDoctors();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/appointment/update/${appointmentId}`,
        { status }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="dashboard page bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md-grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md doschedulise">
              <h1>DOSCHEDULISE</h1>
              <div className="text-center">
                <h2 className="font-semibold">Welcome!</h2>
                <h3>Welcome to DoSchedulise Dashboard!</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
              <p className="font-semibold">Total Appointments</p>
              <h3 className="font-bold text-blue mt-2">
                {appointments.length}
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
              <p className="font-semibold">Registered Doctors</p>
              <h3 className="font-bold text-blue mt-2">{doctors.length}</h3>
            </div>
          </div>
          <div className="mt-8 bg-white rounded-lg shadow-md">
            <h5 className="font-semibold py-4 px-6 bg-gray-200 border-b border-gray-300">
              Appointments
            </h5>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-2 px-4">Patient</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Doctor</th>
                    <th className="py-2 px-4">Department</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Visited</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments && appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>{`${appointment.firstName}  ${appointment.lastName}`}</td>
                        <td>{appointment.appointment_date.substring(0, 16)}</td>
                        <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                        <td>{appointment.department}</td>
                        <td>
                          <select
                            className={
                              appointment.status === "Pending"
                                ? "value-pending"
                                : appointment.status === "Accepted"
                                ? "value-accepted"
                                : "value-rejected"
                            }
                            value={appointment.status}
                            onChange={(e) =>
                              handleUpdateStatus(
                                appointment._id,
                                e.target.value
                              )
                            }
                          >
                            <option value="Pending" className="value-pending">
                              Pending
                            </option>
                            <option value="Accepted" className="value-accepted">
                              Accepted
                            </option>
                            <option value="Rejected" className="value-rejected">
                              Rejected
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No Appointments Found!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
