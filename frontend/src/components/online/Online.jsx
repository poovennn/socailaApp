import './online.css'

function Online({user}) {
    
    return (
        
             <li className="rightbar_friend">
                        <div className="rightbar_profile">
                            <img src={"/assets/"+user.profile_pic} alt="" className="rightbar_profile_img" />
                            <span className="rightbar_profile_online"></span>
                            <span className="rightbar_profile_name">{user.username}</span>
                        </div>
            </li>
        
    )
}

export default Online
