import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import decodeToken from '../utils/jwt';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);  

    useEffect(() => {
        const token = localStorage.getItem('token');
        
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
                    }
                };

                fetchUserById();
            } else {
                console.error('Invalid token');
            }
        }
    }, []); 

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
