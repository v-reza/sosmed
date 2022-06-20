import React, { useContext, useRef } from "react";
import { loginCall } from "../../config/ApiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, error, dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    console.log(user)
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
          <form className="loginBox" onSubmit={handleLogin}>
            <input
              placeholder="Email"
              ref={email}
              type="email"
              className="loginInput"
              required
            />
            <input
              placeholder="Password"
              ref={password}
              type="password"
              className="loginInput"
              minLength={6}
              required
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="15px" />
              ) : (
                "Log in"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={() => {
                navigate("/register");
              }}
            >
              Create New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
