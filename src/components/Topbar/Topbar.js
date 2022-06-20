import React, { useContext, useEffect, useState } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [dataUser, setDataUser] = useState([]);
  const [nores, setNoRes] = useState(false);
  const navigate = useNavigate()

  const handleOnSearch = (string, results) => {
  };

  const handleOnSelect = (item) => {
    navigate("/profile/" + item.username)
  };

  const handleOnFocus = () => {
  };

  useEffect(() => {
    const fetchUser = () => {
      axios.get("/user/all").then((response) => {
        setDataUser(response.data);
      });
    };
    fetchUser();
  }, []);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Velkeymedia</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          {/* <Search className="searchIcon" /> */}
          <ReactSearchAutocomplete
            key={dataUser._id}
            items={dataUser}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            fuseOptions={{ keys: ["username"] }}
            resultStringKeyName="username"
            placeholder={nores ? "No results found" : "Search for friend"}
            styling={{
              borderRadius: "10px",
              width: 100,
              height: "30px",
              display: "flex",
              alignItem: "center"
            }}
            minMatchCharLength={4}
          />
          {/* ); */}
          {/* <input
            placeholder="Search for friend, post or vide"
            className="searchInput"
          ></input> */}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLink">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "/person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
