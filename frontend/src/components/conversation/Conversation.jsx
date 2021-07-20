import axios from "../../axios";
import { useEffect, useState } from "react";
import "./conversation.css";

function Conversation({ conversation, currentuser }) {
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    let unmount = false;
    const friendId = conversation.members.find((m) => m !== currentuser._id);
    const getuser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        !unmount && setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getuser();
    return () => {
      unmount = true;
    };
  }, [currentuser, conversation]);
  return (
    <div className="conversation">
      <img
        src={
          user
            ? user.profilePicture
              ? user.profilePicture
              : "/assets/person/profile.png"
            :  "/assets/person/profile.png"
        }
        alt=""
        className="conversation_img"
      />
      <span className="conversation_name">
        {user ? user.username : "notloaded"}
      </span>
    </div>
  );
}

export default Conversation;
