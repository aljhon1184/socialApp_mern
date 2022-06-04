import Header from '../../components/header/Header'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './singlepost.css'
import { useContext, useEffect, useState} from 'react'
import { useLocation} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

function Singlepost() {

    const postId = useLocation().pathname.split("/")[2];
    const [posts, setPosts] = useState({});
    const { user } = useContext(AuthContext);
    

    useEffect(() =>{
        const fetchPost = async () =>{
            const res = await axios.get("/post/find/" + postId ,{
                headers: {
                    token: "Bearer " + user.accessToken,
                },
            });
            setPosts(res.data);
        };
        fetchPost();
    },[postId, user.accessToken])

    return (
        <>
        <Topbar/>
        <div className="singlepost">
            <Sidebar/>
            <Header posts={posts}/>
            <Rightbar/>
        </div>
        </>
    )
}

export default Singlepost
