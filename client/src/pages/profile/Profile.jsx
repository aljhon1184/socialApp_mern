
import './profile.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Profilesidebar from '../../components/profilesidebar/Profilesidebar';
import Post from '../../components/post/Post';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import storage from '../../firebase'
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import {UpdateStart, follow, unFollow, updateProfilePic, updateCoverPic } from '../../context/AuthActions'


export default function Profile() {

    const { user:currentuser ,dispatch } = useContext(AuthContext);
    //const currentuser = JSON.parse(localStorage.getItem('profile'));
    const path = useLocation();
    const userName = path.pathname.split("/")[2];
    const profilePage = path.pathname.split("/")[1];
    const [user, setUser] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [profile, setProfile] = useState(null);
    const [cover, setCover] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [coverMode, setCoverMode] = useState(false);

    useEffect(() =>{
        const fetchUser = async () =>{
            const res = userName && await axios.get(`/users?username=${userName}`)
            setUser(res.data);
        };
        fetchUser();
    },[userName,profile,cover]);


    const finaluploade = async (url) =>{
        if(profile){
            const updateProfile = {
                userId: currentuser._id,
                profilePicture: url,
            }
            try{
                await axios.put("/users/" + user._id, updateProfile , {
                    headers: {
                        token: "Bearer " + currentuser.accessToken,
                    },
                })
                dispatch(updateProfilePic(updateProfile));
                setUpdateMode(false);
                setProfile(null);

            }catch(err){
                console.log(err);
            }
           
        }else if(cover){
            const updateCover = {
                userId: currentuser._id,
                coverPicture: url,
            }
            try{
                await axios.put("/users/" + user._id, updateCover, {
                    headers: {
                        token: "Bearer " + currentuser.accessToken,
                    },
                });
                dispatch(updateCoverPic(updateCover));
                setCoverMode(false);
                setCover(null);

            }catch(error){
                console.log(error)
            }
            
        }
       
    }
    const upload = (items) => {
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            console.log(fileName);
            const uploadTask = storage.ref(`/personal/${fileName}`).put(item.file);
            uploadTask.on("state_changed", (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, 
                (error) => {console.log(error);
                },
                 () => {
                        uploadTask.snapshot.ref.getDownloadURL().then(url =>{
                                //console.log(url);
                                finaluploade(url);
                            });
                        });
                    })
            };

    const handleSubmit = ()=>{
        setUpdateMode(true);
        setCoverMode(false);
    }
    const coverSubmit = () =>{
        setCoverMode(true);
        setUpdateMode(false)
    }

    const onClick = () =>{
        setUpdateMode(false);
        setCoverMode(false);
        setCover(null);
        setProfile(null);
    }
    
    const postSubmit = async (e) =>{
        e.preventDefault();
        dispatch(UpdateStart());
        if(profile){
            upload([
                {file: profile, label: "profile"}
            ])
            // const data = new FormData();
            // const filename = Date.now() + profile.name;
            // data.append("name", filename);
            // data.append("file", profile);
            // updateProfile.profilePicture = filename;
            // try{
            //     await axios.post("/upload", data)
            // }catch(err){
            //     console.log(err);
            // }
        }else if(cover){
            upload([
                {file: cover, label: "cover"}
            ])
            // const data = new FormData();
            // const filename = Date.now() + cover.name;
            // data.append("name", filename);
            // data.append("file", cover);
            // updateCover.coverPicture = filename;
            // try{
            //     await axios.post("/upload", data)
            // }catch(err){
            //     console.log(err);
            // }
        }
        try{
            // profile 
            // ? await axios.put("/users/" + user._id, updateProfile , {
            //     headers: {
            //         token: "Bearer " + currentuser.accessToken,
            //     },
            // })
            // : await axios.put("/users/" + user._id, updateCover, {
            //     headers: {
            //         token: "Bearer " + currentuser.accessToken,
            //     },
            // });
            // profile ? dispatch(updateProfilePic(updateProfile)) : dispatch(updateCoverPic(updateCover));
            // window.location.reload();
            // setUpdateMode(false);
            // setCoverMode(false);
        }catch(err){
            // console.log(err);
            // dispatch(UpdateFailure());
        }
    }
    const handleFollow = async () =>{
        const userID = {
            userId: currentuser._id
        };
        try{
            await axios.put(`/users/${user._id}/follow`, userID, {
                headers: {
                    token: "Bearer " + currentuser.accessToken,
                },
            });
            dispatch(follow(user._id));
        }catch(err){
            console.log(err);
        }
    }
    const FunFollow = async () =>{
        const userID ={
            userId: currentuser._id
        };
        try{
            await axios.put(`/users/${user._id}/unfollow`, userID, {
                headers: {
                    token: "Bearer " + currentuser.accessToken,
                },
            });
            dispatch(unFollow(user._id));
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div className="profile">
            <Topbar/>
            <div className="profileContainer">
                <Sidebar/>
                <div className="profilesCover">
                    <form onSubmit={postSubmit}>
                        <label htmlFor="coverProfile">
                            <div className="coverPro">
                                <img className="coverImgs" onClick={coverSubmit} src={cover ? URL.createObjectURL(cover) : user.coverPicture ? user.coverPicture : PF + "no-cover.jpg"} alt="" />
                                <input type="file" onChange={(e) =>(setCover(e.target.files[0]))} id="coverProfile" style={{display:"none"}} />
                            </div>
                        </label>
                      
                        <label htmlFor="profile">
                            <div className="profilePhoto">
                                <img className="PPimg" onClick={handleSubmit} src={profile ? URL.createObjectURL(profile) : user.profilePicture ? user.profilePicture : PF + "no-avatar.png"} alt="" />
                                <input className="inputProfile" onChange={(e) =>(setProfile(e.target.files[0]))} type="file" id="profile"/>
                                <div className="profileName">
                                    <span className="PPname"><b>{user.username}</b></span>
                                 </div>
                                 {currentuser._id !== user._id && (
                                     currentuser.followings.includes(user._id) 
                                     ? 
                                     <button className="ProfFollow" onClick={FunFollow}>UNFOLLOW</button>
                                     :
                                     <button className="ProfFollow" onClick={handleFollow}>FOLLOW</button> 
                                 )}
                            </div>
                        </label>
                        {updateMode ? (
                                    <div className="buttons">
                                        <button className="btn" type="submit">Update Profile</button>
                                        <button className="btn" onClick={onClick}>Cancel</button>
                                    </div>
                                 ) : (
                                     <>
                                    {coverMode && (
                                        <div className="buttons">
                                            <button className="btn" type="submit">Update Cover</button>
                                            <button onClick={onClick} className="btn">Cancel</button>
                                        </div>
                                     )}
                                     </>
                                 )}
                        
                    </form>
                    <div className="profileWrapper">
                        <div className="div">
                            <Post users={userName} profilePage={profilePage}/>
                        </div>
                        <div className="d">
                            {currentuser.followings.includes(user._id) ? (
                                <>
                                <button className="btnFollowbutton" onClick={FunFollow}>UNFOLLOW</button>
                                <Profilesidebar user={user}/>
                                </>
                            ) : currentuser._id === user._id ? (
                                <Profilesidebar user={user}/>
                            ) : !currentuser.followings.includes(user._id) && !currentuser.followers.includes(user._id) ? (
                                <>
                                <button className="btnFollowbutton" onClick={handleFollow}>FOLLOW</button>
                                <Profilesidebar user={user}/>
                                </>
                            ) : (
                                <>
                                <button className="btnFollowbutton" onClick={handleFollow}>FOLLOW BACK</button>
                                <Profilesidebar user={user}/>
                                </>
                            )}
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
