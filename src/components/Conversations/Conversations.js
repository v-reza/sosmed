import React, { useEffect, useState } from "react";
import "./conversations.css";
import axios from "axios"
const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id)
    const getUser = async () => {
      try {
        const res = await axios.get('/user?userId=' + friendId)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()

  }, [conversation, currentUser._id])

  return (
    <div className="conversation">
      <img className="conversationImg" alt="" src={user.profilePicture ? PF+user.profilePicture : PF+"/person/noAvatar.png"} />
      <span className="conversationName">{user.username}</span>
    </div>
  );
};

export default Conversations;
