import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginUser, registerUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (currState === "Sign Up") {
        await registerUser(formData);
      } else {
        await loginUser({
          email: formData.email,
          password: formData.password
        });
      }
      setShowLogin(false); // Close the popup after successful login/signup
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>          ) : (
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <input 
            type="email" 
            placeholder="Your Email" 
            required 
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By proceeding, I accept the Terms of Use and Privacy Policy.</p>
        </div>
        {currState==="Login"
        ? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
        }

      </form>
    </div>
  );
};

export default LoginPopup;
