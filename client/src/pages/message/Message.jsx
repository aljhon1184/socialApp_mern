import './message.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Messages from '../../components/messages/Messages'

export default function Message() {
    return (
        <>
            <Topbar />
            <div className="message">
                <Sidebar/>
                <div className="MessageContainer">
                    <div className="container">
                        <Messages/>
                        <Messages/>
                        <Messages/>
                    </div>
                    <div className="textarea-container">
                        <textarea className="msgArea"></textarea>
                        <button className="msgBtn">SEND</button>
                    </div>
                </div>
                <Rightbar/>
            </div>
        </>
    )
}
