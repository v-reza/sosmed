import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom"
import "./register.css";
const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleMatchPassword = (e) => {
    const { name, value } = e.target;
    if (name === "password1") setPassword1(value);
    if (name === "password2") setPassword2(value);
  };

  const checkPass = useCallback(() => {
    if (password1 !== password2) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password1, password2]);

  useEffect(() => {
    checkPass();
  }, [checkPass]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password does not match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const res = await axios.post("/auth/register", user)
        navigate("/login")
      } catch (error) {
        
      }
    }
  };

  
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Velkeymedia</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleRegister}>
            <input
              required
              ref={username}
              placeholder="Username"
              className="loginInput"
            />
            <input
              required
              ref={email}
              placeholder="Email"
              className="loginInput"
              type="email"
            />
            <input
              required
              ref={password}
              placeholder="Password"
              className="loginInput"
              type="password"
              minLength={6}
              name="password1"
              onChange={handleMatchPassword}
            />
            <input
              required
              ref={passwordAgain}
              placeholder="Password Again"
              className="loginInput"
              type="password"
              minLength={6}
              name="password2"
              onChange={handleMatchPassword}
            />
            {passwordMatch && (
              <p className="text-danger">Password does not match!</p>
            )}
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton" onClick={() => {navigate("/login")}}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
