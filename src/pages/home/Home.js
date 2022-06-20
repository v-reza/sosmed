import React, { useContext } from "react";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"

const Home = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar user={user} home/>
      </div>
    </>
  );
};

export default Home;
