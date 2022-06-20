import React, { useContext, useEffect, useRef, useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Cancel } from "@mui/icons-material";
const Share = ({newPostCallback}) => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const descValue = (value) => {
    if (value) {
      setDisabledButton(false)
      setDescription(value)
    } else {
      setDisabledButton(true)
      setDescription(value)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: description,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName)
      data.append("file", file);
      newPost.img = fileName
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("/posts", newPost);
      newPostCallback(true)
    } catch (error) {
      console.log(error);
    }

    setFile(null)
    setDescription("")

  };

  const showImg = (e) => {
    e.preventDefault()
    setFile(e.target.files[0])
    setDisabledButton(false)
    console.log("show img")
  }
  
  const cancelImg = (e) => {
    e.preventDefault();
    setFile(null)
    setDisabledButton(true)
    console.log("cacn")
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "/person/noAvatar.png"
            }
            alt=""
          />
          <input
            className="shareInput"
            placeholder={'What"s in your mind ' + user.username + "?"}
            ref={desc}
            value={description}
            onChange={(e) => descValue(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img alt="" className="shareImg" src={URL.createObjectURL(file)}/>
            <Cancel className="shareCancelImg" onClick={cancelImg}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                // onChange={(e) => setFile(e.target.files[0])}
                onChange={showImg}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="gold" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className={disabledButton ? "shareButtonDisabled" : "shareButton"} type="submit" disabled={disabledButton}>
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
