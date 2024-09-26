import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import decodeToken from '../utils/jwt';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            const decodedToken = decodeToken(token);
            
            if (decodedToken?.id) {
                const fetchUserById = async () => {
                    try {
                        const userId = decodedToken.id;
                        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/userById/${userId}`);
                        setUser(response.data.user);
                    } catch (error) {
                        console.error('Error fetching user by ID:', error);
                        setUser(null);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchUserById();
            } else {
                console.error('Invalid token');
                setLoading(false);
            }
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ user, loading, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
