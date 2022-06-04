import './topbar.css'
import { Search, GroupAdd, Message, Notifications, HelpOutline,ArrowDropDown } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Followers from '../followers/Followers'

export default function Topbar() {

    const { user, dispatch } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [followers, setFollowers] = useState([]);
    const handleLogout = () =>{
        dispatch({ type: "LOGOUT"});
    };

    const handleClick = () =>{
        setSearch("");
    }
    useEffect(() =>{
        const getFollowers = async () =>{
            const res = await axios.get("/users/followers/" + user?._id, {
                headers: {
                    token: "Bearer " + user?.accessToken,
                },
            });
            setFollowers(res.data);
        };
        getFollowers();
    },[user?._id,user?.accessToken, search]);
    
    return (
        <div className="topbar">
            <div className="topbarleft">
                <Link to="/" className="link">
                    <span className="topbartitle">Social App</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <input className="topbarSearchInput" id="inputSearch" value={search} onChange={(e) => setSearch(e.currentTarget.value)} type="text" placeholder="Search" />
                <Link to={`/search/${search}`}>
                    <Search className="topbarIcon" onClick={handleClick}/>
                </Link>
            </div>
            <div className="topbarRight">
                <Link to={`/profile/${user?.username}`}>
                    <img className="topbarImage" src={user?.profilePicture ? user.profilePicture : PF + "no-avatar.png"} alt="" />
                </Link>
                <div className="followers">
                    <GroupAdd className="righbarIcon"/>
                    <div className="people">
                        {followers.map((f) =>(
                            <Followers key={f._id} followers={f}/>
                        ))}
                        {/* <Followers followers={followers}/> */}
                    </div>
                </div>
                <Link to="/messages" className="link">
                    <Message className="righbarIcon"/>
                </Link>
                <Notifications className="righbarIcon"/>
                <HelpOutline className="righbarIcon"/>
                
                <div className="drop_down">
                    <ArrowDropDown className="righbarIcons"/>
                    <div className="options">
                        <Link to="/settings" className="link">
                            <span className="op">Settings</span>
                        </Link>
                        <span onClick={handleLogout} className="op">Logout</span>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
