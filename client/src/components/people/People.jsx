import React, {useEffect, useState, useContext } from 'react'
import './people.css'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'
import Carousel from "react-elastic-carousel";
import { Link } from 'react-router-dom';
import { follow } from '../../context/AuthActions'
export default function People(){
    const { user, dispatch } = useContext(AuthContext);
    const [usersPeople, setUsersPeople] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(() =>{
        const fetchUser = async () =>{
            const res  = await axios.get("/users/getusers/" + user._id);
            setUsersPeople(res.data.newArray);
        };
        fetchUser();
    },[user._id, dispatch])

    const handleFollow = async (followers) =>{
        const userID = {
            userId: user._id
        };
        try{
            await axios.put(`/users/${followers}/follow`, userID , {
                headers: {
                    token: "Bearer " + user.accessToken,
                },
            });
            dispatch(follow(followers));
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    const breakPoints = [
        { width: 1, itemsToShow: 3 },
        { width: 550, itemsToShow: 3 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 3 },
      ];

    return (
        <div className="people_might_know">
            <div className="people_container">
                <span className="peopleTitile">People you might know</span>
                <Carousel breakPoints={breakPoints}>
                    {usersPeople.map((peps) => (
                        <div className="people_details" key={peps._id}>
                                <Link className="links" to={`/profile/${peps.username}`}>
                                <img className="people_img" src={peps.profilePicture ? peps.profilePicture : PF + "no-avatar.png" } alt="" />
                                </Link>
                                <span className="peopleName">{peps.username}</span>
                            <button className="btnPeople" onClick={() => handleFollow(peps._id)}>FOLLOW</button>
                        </div>
                        ))}
                </Carousel>
            </div>
        </div>
    )
}
