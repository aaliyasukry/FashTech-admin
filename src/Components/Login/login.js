import { BsPerson, BsLock } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Password2') {
      localStorage.setItem('isAuthenticated', 'true');
      onLogin();
      toast.success("Login successful!");
      navigate('/dashboard');
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="brand-name">
          <h1>GrocerGo</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <div className="input-container">
              <BsPerson className="form-icon" />
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <div className="input-container">
              <BsLock className="form-icon" />
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <span className="forgot-password">FORGOT PASSWORD?</span>
          </div>

          <button className="login-btn" type="submit">
            <b>LOGIN</b>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;