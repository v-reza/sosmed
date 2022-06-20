import React, { useEffect } from "react";
import "./sidebar.css";
import {
  RssFeed,
  HelpOutline,
  WorkOutline,
  Bookmark,
  Event,
  School,
  Groups,
  PlayCircle,
  Chat,
} from "@mui/icons-material";
import axios from "axios";
import { Users } from "../../dummyData";

const Sidebar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  // useEffect(() => {
  //   const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
  //   const myMidtransClientKey = "SB-Mid-client--W_7vf6Uu8Wzufl-"; //change this according to your client-key

  //   const script = document.createElement("script");
  //   script.src = snapSrcUrl;
  //   script.setAttribute("data-client-key", myMidtransClientKey);
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const snapPay = () => {
    // axios.get('http://localhost:8000/api/snapToken')
    // .then(function(response) {
    //   const snapToken = response.data.snapToken
    //   window.snap.pay(`${snapToken}`, {
    //     onSuccess: function(result){
    //       /* You may add your own implementation here */
    //     },
    //     onPending: function(result){
    //       /* You may add your own implementation here */
    //     },
    //     onError: function(result){
    //       /* You may add your own implementation here */
    //     },
    //     onClose: function(){
    //       /* You may add your own implementation here */
    //     }
    //   })
    // })
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircle className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Groups className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton" onClick={snapPay}>
          Show More
        </button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((user) => (
            <li className="sidebarFriend" key={user.id}>
              <img
                className="sidebarFriendImg"
                src={PF + user.profilePicture}
                alt=""
              />
              <span className="sidebarFriendName">{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
