import React, { useEffect } from 'react';
import './Dashboard.css'; 
import axios from 'axios'

const Dashboard = () => {




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
              <h3 className="font-bold text-blue mt-2">1500</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
              <p className="font-semibold">Registered Doctors</p>
              <h3 className="font-bold text-blue mt-2">10</h3>
            </div>
          </div>
          <div className="mt-8 bg-white rounded-lg shadow-md">
            <h5 className="font-semibold py-4 px-6 bg-gray-200 border-b border-gray-300">Appointments</h5>
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
                  {/* Replace this with your table data */}
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
