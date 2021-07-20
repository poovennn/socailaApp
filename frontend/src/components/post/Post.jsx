import React, { useContext, useEffect } from "react";
import "./post.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState } from "react";
import axios from "../../axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Authcontext } from "../../context/Authcontext";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setIsliked] = useState(false);

  const [user, setUser] = useState({});
  const { user: currentuser } = useContext(Authcontext);

  useEffect(() => {
    setIsliked(post.likes.includes(currentuser._id));
  }, [post.likes, currentuser._id]);

  useEffect(() => {
    let unmount = false;
    import likeicon from "../../assets/like.png";

    const getuser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        if (!unmount) {
          setUser(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getuser();
    return () => {
      unmount = true;
    };
  }, [post.userId]);

  const handleclick = () => {
    try {
      axios.put("/post/" + post._id + "/like", { userId: currentuser._id });
    } catch (err) {}
    setLike(isliked ? like - 1 : like + 1);
    setIsliked(!isliked);
  };

  return (
    <div className="post">
      <div className="post_wrapper">
        <div className="post_top">
          <div className="post_top_left">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user?.profilePicture
                    ? user.profilePicture
                    : "/assets/person/profile.png"
                }
                alt=""
                className="post_top_left_img"
              />
            </Link>

            <span className="post_top_left_name">{user.username}</span>
            <span className="post_top_left_date">{format(post.createdAt)}</span>
          </div>
          <div className="post_top_right">
            <MoreVertIcon className="post_top_right_icon" />
          </div>
        </div>
        <div className="post_center">
          <span className="post_center_text">{post.desc}</span>
          <img src={post.img && post.img} alt="" className="post_center_img" />
        </div>
        <div className="post_bottom">
          <div className="post_bottom_left">
            <img
              src={"/assets/like.png"}
              alt=""
              className="post_bottom_left_img"
              onClick={handleclick}
            />
            <img
              src={"/assets/heart.png"}
              alt=""
              className="post_bottom_left_img"
              onClick={handleclick}
            />
            <span className="post_bottom_left_likecounter">
              {like} People Liked This Post
            </span>
          </div>
          <div className="post_bottom_right">
            <span className="post_bottom_right_comment">
              {post.comment} Comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
