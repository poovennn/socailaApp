import React, { useContext } from "react";
import "./topbar.css";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link } from "react-router-dom";
import { Authcontext } from "../../context/Authcontext";

function Topbar() {
  const { user } = useContext(Authcontext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbar">
      <div className="topbar_left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topbar_logo">Codebook</span>
        </Link>
      </div>
      <div className="topbar_center">
        <div className="searchbar">
          <SearchIcon className="search_icon" />
          <input
            type="text"
            placeholder="Search name friends videos"
            className="search_input"
          />
        </div>
      </div>
      <div className="topbar_right">
        <div className="topbar_links">
          <span className="topbar_link">Homepage</span>
          <span className="topbar_link">Timeline</span>
        </div>
        <div className="topbar_icons">
          <div className="topbar_icon">
            <PersonIcon />
            <span className="topbar_badge">1</span>
          </div>
          <div className="topbar_icon">
            <NotificationsIcon />
            <span className="topbar_badge">1</span>
          </div>
          <div className="topbar_icon">
            <ChatIcon />
            <span className="topbar_badge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            className="topbar_profile"
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "person/profile.png"
            }
            alt="topbar_profile"
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
