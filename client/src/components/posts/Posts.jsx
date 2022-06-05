import './posts.css'
import { MoreHoriz} from '@material-ui/icons'
import { format } from 'timeago.js'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Comment from '../comment/Comment'
import { useDispatch } from 'react-redux'
import { createComment } from '../../actions/posts'

export default function Posts( {posts, noData, username} ) {

    const [like, setLike] = useState(posts?.likes?.length);
    const [isLiked, setIsLiked] = useState(false);
    const [users, SetUsers] = useState([]);
    const [commentView, setCommentView] = useState(false);
    const [newComment, setNewComment] = useState("");
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    //const [click, setClick] = useState(false);
    const noAvatar = "https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png"
    const { user } = useContext(AuthContext);
    const [ss, setSs] = useState(true);
    const dispatch = useDispatch();

    useEffect(() =>{
        setIsLiked(posts?.likes.includes(user._id));
    },[user._id, posts?.likes]);

    useEffect(() =>{
        let controller = new AbortController();
        const getUsers = async () =>{
            try{
                if(ss){
                    const res = !noData && await axios.get(`/users?userId=${posts?.userId}`, { signal: controller.signal });
                    SetUsers(res.data);
                }
                }catch(err){
                if(err.message === "canceled"){
                    
                }else{
                    throw err;
                }   
            }
            
        };
        getUsers();
        return () =>{
            controller.abort();
            setSs(false);
        }
    },[posts?.userId,ss,noData])

    const likeHandler = async ()  =>{
        try{
            axios.put("/post/" + posts?._id + "/like", { userId : user._id}, {
                        headers: {
                            token: "Bearer " + user.accessToken,
                        },
                    });
            
        }catch(err){
            console.log(err);
        }
        setLike(isLiked ? like -1 : like + 1);
        setIsLiked(!isLiked);
    }


    const handeDelete = async () =>{
        try{
            await axios.delete(`/post/${posts?._id}`, {
                data: {userId: user._id}, 
            });
            window.location.reload("/");
        }catch(err){
            console.log(err);
        }
    }
    
    const handleClick = () =>{
        setCommentView((prev) => !prev);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const value = {
            userId: user._id,
            comment: newComment,
        }

       dispatch(createComment(value, posts?._id, user.accessToken));
       setNewComment("");
    }
    return (
        <div className="posts">
            {noData ? (
                <span className="noPosts">No post available on {username}!</span>
            ) : (

                <div className="postsWrapper">
                <Link className="link" to={`/profile/${users.username}`}>
                    <img className="postprofilesImg" src={users?.profilePicture ? users.profilePicture : noAvatar} alt="" />
                    <div className="details">
                        <span className="spanName">{users.username}</span>
                        <span className="spanDate">{format(posts.createdAt)}</span>
                    </div> 
                </Link>
                <div className="drop_option">
                    <MoreHoriz className="moreHoriz"/>
                    {user._id === posts.userId ? (
                        <div className="option">
                            <Link className="link" to={`/single/${posts._id}`}>
                            <span className="spanEdit">Edit</span>
                            </Link>
                            <span onClick={handeDelete} className="spanDelete">Delete</span>
                        </div>
                    ): (
                        <div className="option">
                            <span className="spanEdit">Share</span>
                        </div>
                    )}
                   
                </div>
                
                <span className="postsDesc">{posts.desc}</span>
                {posts.image && (
                    <img className="postImg" src={posts.image} alt="" />
                )}
                <div className="postIcon">
                    <img className="imgLike" onClick={likeHandler} src={PF + "facebook-like.svg"} alt=""/>
                    <span className="likePeople">{like === 0 ? " " :  like + " people like this post"}</span>
                    {/* <span className="likePeople">{isLiked ? "You and " + like + " people like this post" : like === 0 ? " " : like + " people like this post"}</span> */}
                    <span className="postComments" onClick={handleClick}>{posts.comments.length > 1 ? posts.comments.length + " comments" :  "Write a Comment!"}</span>
                </div>
                {commentView && (
                    <div className="comment_con">
                            {posts.comments.map((c) => (
                                <Comment key={c.createdAt} comment={c} />
                                ))}
                        <form onSubmit={handleSubmit}>
                            <div className="textcommentAre">
                                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className="commentText" placeholder="Write a comment....."></textarea>
                                    <button className="commentBtn" disabled={!newComment} type="submit">Comment</button>

                            </div>
                        </form>
                    </div>
                )}
            </div>
        )}
        </div>
    )
}
