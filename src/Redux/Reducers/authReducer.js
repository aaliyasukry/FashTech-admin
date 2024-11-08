const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('isAuthenticated', 'true');
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      localStorage.removeItem('isAuthenticated');
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};