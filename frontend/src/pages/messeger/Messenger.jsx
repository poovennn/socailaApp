import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import Chatonline from "../../components/chatonline/Chatonline";
import { useContext, useEffect, useRef, useState } from "react";
import { Authcontext } from "../../context/Authcontext";
import axios from "../../axios";
import { io } from "socket.io-client";
import { CircularProgress } from "@material-ui/core";

function Messenger() {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newmessage, setNewmessage] = useState([]);
  const [arrivalmessage, setArrivalmessage] = useState([]);
  const [onlineuser, setOnlineuser] = useState([]);
  const { user } = useContext(Authcontext);
  const [reciever, setReciever] = useState("");
  const scrollRef = useRef();
  const socket = useRef();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    socket.current = io("ws://pooven-socket.herokuapp.com");
    socket.current.on("getmessage", (data) => {
      setArrivalmessage({
        sender: data.userId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalmessage &&
      currentChat?.members.includes(arrivalmessage.sender) &&
      setMessages((prev) => [...prev, arrivalmessage]);
  }, [arrivalmessage, currentChat]);

  useEffect(() => {
    socket?.current.emit("addUser", user._id);
    socket?.current.on("getUser", (users) => {
      setOnlineuser(
        user?.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    let unmount = false;
    const getconversation = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        !unmount && setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getconversation();
    return () => {
      unmount = true;
    };
  }, [user]);

  useEffect(() => {
    let unmount = false;
    const getmessges = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);

        !unmount && setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getmessges();
    return () => {
      unmount = true;
    };
  }, [currentChat]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const message = {
      sender: user._id,
      text: newmessage,
      conversationId: currentChat._id,
    };

    const recieverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendmessage", {
      userId: user._id,
      recieverId: recieverId,
      text: newmessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setSending(false);
      setNewmessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const recieverId = currentChat?.members?.find(
      (member) => member !== user._id
    );
    setReciever(recieverId);
  }, [currentChat, user]);

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
            {conversation.map((c, index) => (
              <div
                key={index}
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
                  {messages.map((m, index) => (
                    <div ref={scrollRef} key={index}>
                      <Message
                        messages={m}
                        own={m.sender === user._id}
                        recieverid={reciever ? reciever : ""}
                        currentuser={user}
                      />
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
                    {sending ? (
                      <CircularProgress size="20px" color="secondary" />
                    ) : (
                      "send"
                    )}
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
            <Chatonline
              onlineuser={onlineuser}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
