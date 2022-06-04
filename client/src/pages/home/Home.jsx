import Post from '../../components/post/Post'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './home.css'

export default function Home() {
    return (
        <div>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                <Post/>
                <Rightbar/>
            </div>
        </div>
    )
}
