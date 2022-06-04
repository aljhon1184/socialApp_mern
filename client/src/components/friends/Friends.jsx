import { Link } from 'react-router-dom';
import './friends.css'
// import { MoreHoriz} from '@material-ui/icons'
// import { useState } from 'react';


export default function Friends( {friend} ) {
    // const [view, setView] = useState(false);


    // const handleClick = () =>{
    //     setView((prev) => setView(!prev))
    // }
    return (
        <div className="friends">
            <div className="friendsDetails">
                <Link to={`/profile/${friend.username}`} className="link">
                    <img className="friendssImg" src={friend.profilePicture} alt="" />
                    <div className="details">
                        <span className="friendsname">{friend.username}</span>
                    </div>
                </Link>
                {/* <MoreHoriz className="moreHorizz" onClick={handleClick}/>
                {view && (
                    <div className="linkto">
                        <span>Send SMS</span>
                    </div>
                    )} */}
                <span className="circleIcon">o</span>
            </div>
        </div>
    )
}
