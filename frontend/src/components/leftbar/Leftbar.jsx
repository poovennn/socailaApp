import React from "react";
import "./leftbar.css";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import ChatIcon from "@material-ui/icons/Chat";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import GroupIcon from "@material-ui/icons/Group";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import HelpIcon from "@material-ui/icons/Help";
import WorkIcon from "@material-ui/icons/Work";
import EventIcon from "@material-ui/icons/Event";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import { User } from "../../Dummydata";
import Friends from "../Friends/Friends";

function Leftbar() {
  return (
    <div className="leftbar">
      <div className="leftbar_wrapper">
        <ul className="leftbar_lists">
          <li className="leftbar_item">
            <RssFeedIcon className="leftbar_icon" />
            <span className="leftbar_text">Feeds</span>
          </li>
          <li className="leftbar_item">
            <ChatIcon className="leftbar_icon" />
            <span className="leftbar_text">Chats</span>
          </li>
          <li className="leftbar_item">
            <PlayCircleFilledIcon className="leftbar_icon" />
            <span className="leftbar_text">Videos</span>
          </li>
          <li className="leftbar_item">
            <GroupIcon className="leftbar_icon" />
            <span className="leftbar_text">Groups</span>
          </li>
          <li className="leftbar_item">
            <BookmarkIcon className="leftbar_icon" />
            <span className="leftbar_text">Bookmarks</span>
          </li>
          <li className="leftbar_item">
            <HelpIcon className="leftbar_icon" />
            <span className="leftbar_text">Questions</span>
          </li>
          <li className="leftbar_item">
            <WorkIcon className="leftbar_icon" />
            <span className="leftbar_text">Jobs</span>
          </li>
          <li className="leftbar_item">
            <EventIcon className="leftbar_icon" />
            <span className="leftbar_text">Events</span>
          </li>
          <li className="leftbar_item">
            <GolfCourseIcon className="leftbar_icon" />
            <span className="leftbar_text">Courses</span>
          </li>
        </ul>
        <button className="leftbar_btn">Show more</button>
        <hr className="leftbar_hr"></hr>

        <ul className="friend_lists">
          {User.map((u) => (
            <Friends key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leftbar;
