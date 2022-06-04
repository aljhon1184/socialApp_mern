import { useContext, useEffect, useState } from 'react';
import Header from '../header/Header'
import Posts from '../posts/Posts'
import './post.css'
import { useLocation } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import {  useDispatch, useSelector } from 'react-redux'
import { getPosts, getProfilePosts, getSearchPosts } from '../../actions/posts';
import { AuthContext } from '../../context/AuthContext';
import People from '../people/People'

export default function Post( {users, profilePage}) {

    const { user } = useContext(AuthContext);
    //const user = JSON.parse(localStorage.getItem('profile'));
    const username = useLocation().pathname.split("/")[2];
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    //const [posts, setPosts] = useState([]);
    //const {isFetching} = useSelector((state) => state.post);
    //const ps = useSelector((state) => state.post.posts);
    const posts = useSelector((state) => state.posts);
    const [ss, setSs] = useState(true);
    const [qq, setQq] = useState(true);
    const [hh, setHh] = useState(true);


    useEffect(() =>{
        const fetchPosts = async () =>{
            if(users){
                try{
                    setError(false);
                    if(ss){
                        // const res = await axios.get("/post/profile/" + users, {
                        //     headers: {
                        //         token: "Bearer " + user.accessToken,
                        //     },
                        // });
                        // setProfilePosts(
                        //     res.data.sort((p1, p2) => {
                        //         return new Date(p2.createdAt) - new Date(p1.createdAt);
                        //     })
                        // );
                        dispatch(getProfilePosts(users, user.accessToken));
                    }
                    
                }catch(err){
                    setError(true);
                    throw err;                 
                }
            }else if(username){
                try{
                    setError(false);
                    if(qq){
                        // const res = await axios.get("/post/" + username ,{
                        //     headers: {
                        //         token: "Bearer " + user.accessToken,
                        //     },
                        // });
                        // setSearchPosts(
                        //     res.data.sort((p1, p2) => {
                        //             return new Date(p2.createdAt) - new Date(p1.createdAt);
                        //         })
                        //     );
                        dispatch(getSearchPosts(username, user.accessToken));
                    }     
                }catch(err){
                    setError(true);
                        throw err;
                }
            }
            else{
                try{
                    setError(false);
                    if(hh){
                       dispatch(getPosts(user._id, user.accessToken));
                    }
                    // if(hh){
                    //     const res = await axios.get("/post/timeline/" + user._id);
                    //     setPosts(
                    //         res.data.sort((p1, p2) => {
                    //                 return new Date(p2.createdAt) - new Date(p1.createdAt);
                    //             })
                    //         );   
                    // }
                    
                }catch(err){
                    setError(true);
                        throw err;
                }
            }
        };
        fetchPosts();
        return ()=>{
            if(users){
                //console.log("Profile")
                //controler.abort();
                setSs(false);
            }else if(username){
                //console.log("Search")
                //controler.abort();
                setQq(false);
            }else{
                //console.log("HOME")
                //controler.abort();
                setHh(false);
            }
        }
    },[user.followings,username,dispatch,users,user._id,ss,qq,hh, user.accessToken])

    return (
        
        <div className="post">
            
            {error ? (
                <span>No Users Found</span>
            ) : (
                <>
                 {!posts.length === 0 ? (
                        <CircularProgress />
                    ) : (
                        <>
                        {(!users || users === user.username) && <Header user={user}/>}
                        {!profilePage && 
                        <People/>}
                        {/* {!profilePage && 
                        usersPeople.map((up) =>(
                                <People people={up} key={up._id}/>
                            ))
                        } */}
                        {!posts?.length ? (
                            <Posts noData username={users}/>
                        ): (
                            <>
                            {posts.sort((p1,p2) => new Date(p2.createdAt) - new Date(p1.createdAt)).map((p) =>(
                                <Posts key={p._id} posts={p}/>
                                ))}
                                </>
                                )}
                        </>       
                    )}
                {/* {users ? (
                <>
                    {(!users || users === user.username) && <Header user={user}/>} 
                    {profilePosts.map((p) =>(
                        <Posts key={p._id} posts={p} />
                    ))}
                </>
                ) : username ? (
                    <>
                    {searchPosts.map((p) =>(
                        <Posts key={p._id} posts={p} />
                    ))}   
                    </>
                 ) : (
                    <>
                    {!posts.length ? (
                        <CircularProgress />
                    ) : (
                        <>
                        {(!users || users === user.username) && <Header user={user}/>}                
                        {posts.sort((p1,p2) => new Date(p2.createdAt) - new Date(p1.createdAt)).map((p) =>(
                            <Posts key={p._id} posts={p} />
                        ))}
                        </>       
                    )}   
                   </>
                )} */}
                </> 
            )}
        </div>
    )
}
