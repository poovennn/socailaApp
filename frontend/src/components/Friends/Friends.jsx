import  './friends.css'

function Friends({user}) {
    
    return (
        <li className="friend_item">
                       <img src={"/assets/"+user.profile_pic} alt="friend img" className="friend_img"></img>
                       <span className="friend_name">{user.username}</span>
                   </li>
    )
}

export default Friends
