import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router";

function Profile() {
  
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const getuser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    getuser();
  }, [username]);

  return (
    <div>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profile_right">
          <div className="profile_right_top">
            <div className="profile_cover">
              <img
                src={user.coverPicture || "/assets/post/1.jpeg"}
                alt=""
                className="profile_coverimg"
              />
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "/assets/person/profile.png"
                }
                alt=""
                className="profile_userimg"
              />
            </div>
            <div className="profile_info">
              <h4 className="profile_infoname">{user.username}</h4>
              <span className="profile_infodesc">{user.description}</span>
            </div>
          </div>
          <div className="profile_right_bottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
