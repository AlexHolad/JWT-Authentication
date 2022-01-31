import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = () => {
  
   const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("data")) {
      navigate("/");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        config
      );
      localStorage.setItem("data", JSON.stringify(data));
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
          </label>
          <input
            type="password"
            required
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
 
          <button type="submit" className="btn btn-primary">
            Login
          </button>


        {/* <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span> */}
      </form>
    </div>
  );
};

export default LoginScreen;
