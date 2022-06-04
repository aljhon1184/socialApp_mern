import './sidebar.css'
import {Favorite, Feedback, Group, LiveTv, Work} from '@material-ui/icons'
import Friends from '../friends/Friends'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Sidebar() {
    const { user } = useContext(AuthContext);
    const [friend, setFriend] = useState([]);

    useEffect(() =>{
        const friendUser = async () =>{
            const res = await axios.get("/users/friends/" + user._id ,{
                headers: {
                    token: "Bearer " + user.accessToken,
                },
            });
            setFriend(res.data);
        };
        friendUser();
    },[user._id, user, user.accessToken])

    
    return (
        <div className="sidebar">
            <div className="content">
                <Feedback className="SidebarIcon" />
                <span className="sidebarSpan">News Feed</span>
            </div>
            <div className="content">
                <LiveTv className="SidebarIcon" />
                <span className="sidebarSpan">Watch Vidoes</span>
            </div>
            <div className="content">
                <Work className="SidebarIcon" />
                <span className="sidebarSpan">Jobs</span>
            </div>
            <div className="content">
                <Favorite className="SidebarIcon" />
                <span className="sidebarSpan">Favorite</span>
            </div>
            <div className="content">
                <Group className="SidebarIcon" />
                <span className="sidebarSpan">Groups</span>
            </div>
            <span className="Friends">Friends Online</span>
            {friend.map((f) => (
                <Friends key={f._id} friend={f}/>
            ))}
            
        </div>
    )
}
