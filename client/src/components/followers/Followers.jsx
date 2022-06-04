
import './followers.css'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {follow, unFollow} from '../../context/AuthActions'



export default function Followers( {followers}) {
    const { user, dispatch } = useContext(AuthContext);

    const FollowBack = async () =>{
        const userID = {
            userId: user._id
        };
        try{
            await axios.put(`/users/${followers._id}/follow`, userID , {
                headers: {
                    token: "Bearer " + user.accessToken,
                },
            });
            dispatch(follow(followers._id));
            //dispatch(Follow(followers._id, userID));
        }catch(err){
            console.log(err);
        }
    }
    const FunFollow = async () =>{
        const userID ={
            userId: user._id
        };
        try{
            await axios.put(`/users/${followers._id}/unfollow`, userID ,{
                headers: {
                    token: "Bearer " + user.accessToken,
                },
            });
            dispatch(unFollow(followers._id));
            //dispatch(UnFollow(followers._id, userID))
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="followers">
            {followers && user?.followings.includes(followers._id) ? (
                <div className="Followers_container">
                    <img className="followersImg" src={followers.profilePicture} alt="" />
                    <span className="followersname">{followers.username}</span>
                    <button onClick={FunFollow} className="btnFollow">UNFOLLOW</button>
                </div>
            ) : (
                <div className="Followers_container">
                <img className="followersImg" src={followers.profilePicture} alt="" />
                <span className="followersname">{followers.username}</span>
                <button onClick={FollowBack} className="btnFollow">Follow Back</button>
                </div>
            )}
        </div>
        
    )
}
