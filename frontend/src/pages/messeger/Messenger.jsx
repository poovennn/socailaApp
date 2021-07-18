import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import Chatonline from "../../components/chatonline/Chatonline";
import { useContext, useEffect, useRef, useState } from "react";
import { Authcontext } from "../../context/Authcontext";
import axios from "axios";

function Messenger() {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newmessage, setNewmessage] = useState([]);
  const { user } = useContext(Authcontext);
  const scrollRef = useRef();

  useEffect(() => {
    const getconversation = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getconversation();
  }, [user]);

  useEffect(() => {
    const getmessges = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat._id);
        console.log(res);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getmessges();
  }, [currentChat]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newmessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewmessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chat_menu">
          <div className="chatmenu_wrapper">
            <input
              type="text"
              placeholder="Search for Friends"
              className="chatmenu_input"
            />
            {conversation.map((c) => (
              <div
                onClick={() => {
                  setCurrentChat(c);
                }}
              >
                <Conversation conversation={c} currentuser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chat_box">
          <div className="chatbox_wrapper">
            {currentChat ? (
              <>
                <div className="chatbox_top">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message messages={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatbox_bottom">
                  <textarea
                    className="chatbox_input"
                    placeholder="write something"
                    onChange={(e) => setNewmessage(e.target.value)}
                    value={newmessage}
                  ></textarea>
                  <button className="chatbox_btn" onClick={handlesubmit}>
                    Send
                  </button>
                </div>{" "}
              </>
            ) : (
              <span className="noconvo">open a conversation</span>
            )}
          </div>
        </div>
        <div className="chat_online">
          <div className="chatonline_wrapper">
            <Chatonline />
            <Chatonline />
            <Chatonline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
