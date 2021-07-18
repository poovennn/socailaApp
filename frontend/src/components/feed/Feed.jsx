import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { Authcontext } from "../../context/Authcontext";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(Authcontext);

  useEffect(() => {
    const getpost = async () => {
      const res = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("/post/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };

    getpost();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feed_wrapper">
        {(!username || username === user.username) && <Share />}

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
