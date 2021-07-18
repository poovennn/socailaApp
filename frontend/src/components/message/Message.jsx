import "./message.css";
import { format } from "timeago.js";

function Message({ messages, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="msg_top">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/mydemo-71f56.appspot.com/o/pooven_images%2Fpooven.JPG?alt=media&token=452fb638-a7d5-43d9-b1d7-61a45f204a60"
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
