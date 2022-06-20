import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./feed.css";
const Feed = ({ username, feedProfile }) => {
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);
  const [newPost, setNewPost] = useState(false);

  const receiveNewPost = useCallback((value) => {
    setNewPost(value);
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
      setPost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id, receiveNewPost]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* {
          username === user.username && (
            <Share newPostCallback={receiveNewPost} />
         } */}
         {(!username || username === user.username) && <Share newPostCallback={receiveNewPost}/>}
        {post.map((post) => (
          <Post posts={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
