import "./chatonline.css";

function Chatonline() {
  return (
    <div className="chatonline">
      <div className="chatonline_friends">
        <div className="chatonline_friend">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mydemo-71f56.appspot.com/o/pooven_images%2Fpooven.JPG?alt=media&token=452fb638-a7d5-43d9-b1d7-61a45f204a60"
            alt=""
            className="chatonline_friend_img"
          />
          <div className="chatonline_friend_badge"></div>
        </div>
        <span className="chatonline_name">john carter</span>
      </div>
    </div>
  );
}

export default Chatonline;
