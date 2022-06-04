import './comment.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { format } from 'timeago.js'

export default function Comment( {comment} ) {

    const [user, setUser] = useState([]);
    const [ss, setSs] = useState(true);
    const noAvatar = "https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png"
    


    useEffect(() => {
        let controller = new AbortController();
        const getUser = async () => {
            try{
                if(ss){
                    const res = await axios.get(`/users?userId=${comment.userId}`, { signal: controller.signal });
                    setUser(res.data);
                }
            }catch(error){
                if(error.message === "canceled"){

                }else{
                    console.log(error);
                }
            }
        };
        getUser();
        return() => {
            controller.abort();
            setSs(false);
        }

    },[comment.userId, comment.comment, ss, comment]);


    return (
            <div className="comment">
                <div className="commentDetails">
                    <img className="commentImg" src={user?.profilePicture ? user.profilePicture : noAvatar} alt="" />
                    <span className="commentName">{user.username}</span>
                    <span className="commentTime">{format(comment.createdAt)}</span>
                </div>
                <p className="comt">{comment.comment}</p>
            </div>
    )
}
