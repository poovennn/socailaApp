import axios from "../../axios";
import { useEffect, useState } from "react";
import "./chatonline.css";


function Chatonline({ onlineuser, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
 

  useEffect(() => {
    const getfriends = async () => {
      try {
        const res = await axios.get("/users/friends/" + currentId);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getfriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineuser.includes(f._id)));
  }, [friends, onlineuser]);

  const handleclick = async (o) => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${o._id}`);
      setCurrentChat(res.data);
      
      if (res.data == null) {
        const newconvo = {
          senderId: currentId,
          recieverId: o._id,
        };
         await axios.post("/conversations", newconvo);
        const secondres = await axios.get(
          `/conversations/find/${currentId}/${o._id}`
        );
        setCurrentChat(secondres.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatonline">
      {onlineFriends.map((o) => (
        <div
          key={o._id}
          className="chatonline_friends"
          onClick={() => handleclick(o)}
        >
          <div className="chatonline_friend">
            <img
              src={
                o?.profilePicture ? o.profilePicture : "/assets/person/profile.png"
              }
              alt=""
              className="chatonline_friend_img"
            />
            <div className="chatonline_friend_badge"></div>
          </div>
          <span className="chatonline_name">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}

export default Chatonline;
