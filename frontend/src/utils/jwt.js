import jwtdecode from 'jwt-decode'

export const deocdedToken = (token) => {
    try {
        const decode = jwtdecode(token);
        return decode;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
}