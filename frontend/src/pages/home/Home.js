import React from 'react'
import './home.css'
import Topbar from '../../components/topbar/Topbar'
import Leftbar from '../../components/leftbar/Leftbar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'


function Home() {
    return (
        <div className="home">
            <Topbar />
            <div className="home_container">
                <Leftbar />
                <Feed />
                <Rightbar />
            </div>
            
        </div>
    )
}

export default Home
