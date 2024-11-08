export const setAuth = (isAuthenticated) => ({
    type: 'SET_AUTH',
    payload: isAuthenticated,
  });
  
  export const login = () => setAuth(true);
  export const logout = () => setAuth(false);  