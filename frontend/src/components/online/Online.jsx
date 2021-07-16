import './online.css'

function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        
             <li className="rightbar_friend">
                        <div className="rightbar_profile">
                            <img src={PF+user.profile_pic} alt="" className="rightbar_profile_img" />
                            <span className="rightbar_profile_online"></span>
                            <span className="rightbar_profile_name">{user.username}</span>
                        </div>
            </li>
        
    )
}

export default Online
