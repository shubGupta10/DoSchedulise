import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Footer from "../components/Footer";

const Profile = () => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/v1/user/user/details');
                console.log(response);
                setUser(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error("Error found", error);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Form data:", formData);
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

    return (
        <>
            <Navbar />
            <Form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName || user.firstName || ''} onChange={handleChange} placeholder="First Name" />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName || user.lastName || ''} onChange={handleChange} placeholder="Last Name" />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email || user.email || ''} onChange={handleChange} placeholder="Email" />
                </div>

                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" name="phone" value={formData.phone || user.phone || ''} onChange={handleChange} placeholder="Phone" />
                </div>

                <button type="submit">Save</button>
            </Form>
        </>
    );
};

export default Profile;
