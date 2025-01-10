import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("username") || null);
    const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    // REGISTER
    const registerAction = async (data) => {
        try {
            const response = await fetch(`http://localhost:9000/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!result) {
                throw new Error(result.error);
            }

            if (result.status === 200) {
                grantAccess(result);
                return;
            } else {
                alert(result.error);
                throw new Error(result.error);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // LOGIN
    const loginAction = async (data) => {
        try {
            const response = await fetch(`http://localhost:9000/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);
            if (result.data) {
                grantAccess(result);
                return;
            }
            alert(result.error);
            throw new Error(result.error);
        } catch (e) {
            console.error(e);
        }
    };

    //LOGOUT
    const logOutAction = () => {
        setUser(null);
        setUserRole(null);
        setToken('');
        localStorage.removeItem('username');
        localStorage.removeItem('site');
        localStorage.removeItem('role');
        navigate('/Login');
    };

    //HELPER
    const grantAccess = async (result) => {
        setUser(result.data.user.username);
        setToken(result.token);
        setUserRole(result.data.user.role);
        localStorage.setItem('username', result.data.user.username);
        localStorage.setItem('site', result.token);
        localStorage.setItem('role', result.data.user.role);
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ token, user, userRole, registerAction, loginAction, logOutAction }}> {children} </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
