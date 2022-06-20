import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { MenuItem, Menu, Modal, Box, Typography } from "@mui/material";
import axios from "axios";
import { format } from "timeago.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ posts }) => {
  const [like, setLike] = useState(posts.likes.length);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?userId=${posts.userId}`);
      setUser(res.data);
    };
    fetchUser();
    setIsLiked(posts.likes.includes(currentUser._id));
  }, [currentUser._id, posts.likes, posts.userId]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${posts._id}/like`, { userId: currentUser._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = () => {
    try {
      axios.delete(`/posts/${posts._id}`, {
        data: {
          userId: currentUser._id,
        },
      });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + "/" + user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(posts.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert
              style={{ cursor: "pointer" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={deletePost}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{posts?.desc}</span>
          <img className="postImg" src={PF + "/" + posts.img} alt="" />
          
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              alt=""
              onClick={likeHandler}
            />
            <img className="likeIcon" src="/assets/heart.png" alt="" />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{posts.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
