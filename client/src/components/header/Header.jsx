import './header.css';
import { AddAPhoto, EditLocation, EmojiEmotions, Label, Cancel } from '@material-ui/icons';
import { useContext, useRef, useState} from 'react';
import axios from 'axios';
import storage from '../../firebase';
import { useHistory } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

export default function Header( {posts} ) {
    const { user } = useContext(AuthContext);
    //const user = JSON.parse(localStorage.getItem('profile'));
    const desc = useRef();
    const [file, setFile] = useState(null)
    const history = useHistory();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const finaluploade = async (url) =>{
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            image: url,
        };
        console.log(newPost);
         if(posts){
            try{
                await axios.put("/post/" + posts._id, newPost, {
                    headers: {
                        token: "Bearer " + user.accessToken,
                    },
                });
                history.push("/");
            }catch(err){}
            
        }else{
            try{
                await axios.post("/post", newPost, {
                    headers: {
                        token: "Bearer " + user.accessToken,
                    },
                });
                window.location.reload();
            }catch(err){}
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        upload([
            { file, label: "img" }
        ]);
        // if(file){
        //     const data = new FormData();
        //     const filename = Date.now() + file.name;
        //     data.append("name", filename);
        //     data.append("file", file);
        //     newPost.image = filename;
        //     //console.log(newPost);
        //     try{
        //         await axios.post("/upload", data);
        //     }catch (err) {}
        // }
        // if(posts){
        //     try{
        //         await axios.put("/post/" + posts._id, newPost, {
        //             headers: {
        //                 token: "Bearer " + user.accessToken,
        //             },
        //         });
        //         history.push("/");
        //     }catch(err){}
            
        // }else{
        //     try{
        //         await axios.post("/post", newPost, {
        //             headers: {
        //                 token: "Bearer " + user.accessToken,
        //             },
        //         });
        //         window.location.reload();
        //     }catch(err){}
        // }
       
    };
    const upload = (items) => {
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            console.log(fileName);
            const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
            uploadTask.on("state_changed", (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, 
                (error) => {console.log(error);
                },
                 () => {
                        uploadTask.snapshot.ref.getDownloadURL().then(url =>{
                                console.log(url);
                                finaluploade(url);
                            });
                        });
                    })
            };
    return (
        <div className="header">
            <div className="headerWrapper">
                <div className="headerContent">
                    <img className="headerImg" src={user.profilePicture ? user.profilePicture : PF + "no-avatar.png"} alt="" />
                    <textarea type="text" ref={desc} defaultValue={posts ? posts.desc : ""} placeholder={`What's on your mind ${user.username}?`} className="headerInput" />
                </div>
                <hr/>
                {file ? (
                    <div className="imageContainer">
                        <img className="Imgcontain" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="cancelIcon" onClick={() =>setFile(null)} />
                    </div>
                ) : posts ? (
                    <div className="imageContainer">
                        <img className="Imgcontain" src={posts.image ? posts.image : file ? URL.createObjectURL(file) : null} alt="" />
                    </div>
                ): (
                    ""
                )}
                
                <form className="shareForm" onSubmit={handleSubmit}>
                    <div className="headerIcons">
                        <label htmlFor="file" className="label">
                            <AddAPhoto className="headerIcon"/>
                            <span className="headerSpan">Add Photos</span>
                            <input style={{ display: "none" }} type="file" id="file"
                            onChange={(e) => setFile(e.target.files[0])} accept=".png,.jpeg,.jpg" />
                            <Label className="headerIcon"/>
                            <span className="headerSpan">Tag</span>
                            <EditLocation className="headerIcon"/>
                            <span className="headerSpan">Location</span>
                            <EmojiEmotions className="headerIcon"/>
                            <span className="headerSpan">Feelings</span>
                            <button className="headerBtn" type="submit">{posts ? "Update" : "Share"}</button>
                        </label>
                    </div>
                    
                </form>
                
                
            </div>
            
            
        </div>
    )
}
