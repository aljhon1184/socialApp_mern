import './rightbar.css'
import {CardGiftcard} from '@material-ui/icons'

export default function Rightbar() {
    return (
        <div className="rightbar">
            <div className="birthday">
                <CardGiftcard className="rightbarIcon"/>
                <span><b>Pola</b> and <b>3 others friends</b> have a birthday today. </span>
            </div>
            <img className="birthdayImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvcysj3MbAzrfN9s5CAepCF8rdjsRANYUH_A&usqp=CAU" alt="" />
            <span className="onlineFriend">Friends</span>
            <div className="onlineFriends">
                <img className="OLFriendsIgm" src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                <div className="online_friendsDetails">
                    <span className="olName">Lorem ipsum dolor sit amet.</span>
                </div>
            </div>
            <div className="onlineFriends">
                <img className="OLFriendsIgm" src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                <div className="online_friendsDetails">
                    <span className="olName">Lorem ipsum dolor sit amet.</span>
                </div>
                
            </div>
            <div className="onlineFriends">
                <img className="OLFriendsIgm" src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                <div className="online_friendsDetails">
                    <span className="olName">Lorem ipsum dolor sit amet.</span>
                </div>
                
            </div>
        </div>
    )
}
