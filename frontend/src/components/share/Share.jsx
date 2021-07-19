import React, { useContext, useRef, useState } from "react";
import "./share.css";
import PhotoIcon from "@material-ui/icons/Photo";
import LabelIcon from "@material-ui/icons/Label";
import RoomIcon from "@material-ui/icons/Room";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { Authcontext } from "../../context/Authcontext";
import axios from "axios";
import { storage } from "../../firebase";
import CancelIcon from "@material-ui/icons/Cancel";
import { CircularProgress } from "@material-ui/core";

function Share() {
  const { user } = useContext(Authcontext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handlechange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    let newpost;
    if (file) {
      const storageref = storage.ref("posts");
      const fileref = storageref.child(file.name);
      await fileref.put(file);
      console.log("fileuploaed");
      const fileurl = await fileref.getDownloadURL();
      newpost = {
        userId: user._id,
        desc: desc.current.value,
        img: fileurl ? fileurl : "",
      };
    } else {
      newpost = {
        userId: user._id,
        desc: desc.current.value,
        img: "",
      };
    }

    try {
      await axios.post("/post", newpost);
      setUploading(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="share_wrapper">
        <div className="share_top">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "person/profile.png"
            }
            alt="share_icon"
            className="share_icon"
          />
          <input
            className="share_input"
            placeholder={"Whats in your mind  " + user.username}
            ref={desc}
          />
        </div>
        <hr className="share_hr" />
        {file && (
          <div className="shareimgcontainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareimg" />
            <CancelIcon className="sharecancel" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="share_bottom" onSubmit={handlesubmit}>
          <div className="share_options">
            <label htmlFor="file" className="share_option">
              <PhotoIcon htmlColor="tomato" className="share_option_icon" />
              <span className="share_option_text">Photos or Videos</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={handlechange}
              />
            </label>
            <div className="share_option">
              <LabelIcon htmlColor="blue" className="share_option_icon" />
              <span className="share_option_text">Tag</span>
            </div>
            <div className="share_option">
              <RoomIcon htmlColor="red" className="share_option_icon" />
              <span className="share_option_text">Location</span>
            </div>
            <div className="share_option">
              <EmojiEmotionsIcon
                htmlColor="goldenrod"
                className="share_option_icon"
              />
              <span className="share_option_text">Feelings</span>
            </div>
          </div>
          <button className="share_options_button" type="submit">
            {uploading ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              "Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
