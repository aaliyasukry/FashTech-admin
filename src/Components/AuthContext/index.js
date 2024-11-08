import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authClient, setAuthClient] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem('authClient');
        if (storedAuth) {
            setAuthClient(JSON.parse(storedAuth));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (client) => {
        setAuthClient(client);
        setIsAuthenticated(true);
        localStorage.setItem('authClient', JSON.stringify(client));
    };

    const logout = () => {
        setAuthClient(null);
        setIsAuthenticated(false);
        localStorage.removeItem('authClient');
    };

    return (
        <AuthContext.Provider value={{ authClient, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
