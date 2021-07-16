import  './friends.css'

function Friends({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="friend_item">
                       <img src={PF+user.profile_pic} alt="friend img" className="friend_img"></img>
                       <span className="friend_name">{user.username}</span>
                   </li>
    )
}

export default Friends
