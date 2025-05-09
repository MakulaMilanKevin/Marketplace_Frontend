import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const API_URL = `http://${window.location.host.split(":")[0]}:8000`;

export const LIGHT = "light";
export const DARK = "dark";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(LIGHT);
    const [termekMod, setTermekMod] = useState(null);
    const navigate = useNavigate();

    const changeTheme = (theme) => {
        localStorage.setItem("theme", theme);
        setTheme(theme);
        document.querySelector("link[rel~='icon']").href = theme == DARK ?
            "./src/assets/VendoIcon.png" : "./src/assets/VendoIconBlack.png";
    }

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");
            const theme = localStorage.getItem("theme");

            if (theme)
                changeTheme(theme);
            else
                changeTheme(DARK);

            if (token && storedUser) {
                try {
                    // Token validáció a backenddel
                    const response = await fetch(`${API_URL}/userapi/profil/${JSON.parse(storedUser).user_id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (response.ok) {
                        setUser(JSON.parse(storedUser));
                    } else {
                        localStorage.clear();
                    }
                } catch (e) {
                    localStorage.clear();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const handleResponse = async (response) => {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Hiba történt a kérés feldolgozása során');
        }
        return data;
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/userapi/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await handleResponse(response);
            localStorage.setItem('token', data.token);
            const userData = {
                username: data.username,
                email: data.email,
                user_id: data.user_id,
                token: data.token
            };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await fetch(`${API_URL}/userapi/regisztracio`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            await handleResponse(response);
            toast.success('Sikeres regisztráció! Kérjük jelentkezzen be');
            navigate('/bejelentkezes');
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        toast('Sikeres kijelentkezés');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, changeTheme, theme, termekMod, setTermekMod }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;