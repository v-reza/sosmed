import React, { useContext, useEffect } from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />}></Route>
          <Route
            exact
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          ></Route>
          <Route
            exact
            path="/register"
            element={user ? <Navigate to="/" replace /> : <Register />}
          ></Route>
          <Route
            exact
            path="/profile/:username"
            element={user ? <Profile /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/messenger"
            exact
            element={!user ? <Navigate to="/"/> : <Messenger/>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
