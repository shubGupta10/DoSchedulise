import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/user/user/details/${id}`);
                setUser(response.data.user);
                setFormData(response.data.user);
            } catch (error) {
                console.error("Error found", error);
            }
        };

        fetchUser();
    }, [id]); // Make sure to include 'id' in the dependency array

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
