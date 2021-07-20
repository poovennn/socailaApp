import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "../../axios";

function Message({ messages, own, recieverid, currentuser }) {
  const [friend, setFriend] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    let unmount = false;
    const getfriend = async () => {
      try {
        if (recieverid) {
          const res = await axios.get("/users?userId=" + recieverid);
          if (res) {
            if (!unmount) {
              setFriend(res.data);
            }
          }
        } else {
          console.log("error in recieverid");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getfriend();

    return () => {
      unmount = true;
    };
  }, [recieverid]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="msg_top">
        <img
          src={
            own
              ? currentuser?.profilePicture
                ? currentuser.profilePicture
                : PF + "person/profile.png"
              : friend?.profilePicture
              ? friend.profilePicture
              : PF + "person/profile.png"
          }
          alt=""
          className="msg_img"
        />
        <p className="msg_p">{messages && messages.text}</p>
      </div>
      <div className="msg_bottom">{format(messages.createdAt)} </div>
    </div>
  );
}

export default Message;
