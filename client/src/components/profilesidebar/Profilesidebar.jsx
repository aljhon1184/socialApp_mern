import './profilesidebar.css'

export default function Profilesidebar( {user} ) {
    return (
        <div className="profileSidebar">
            <div className="profileSidebarWrapper">
                <span className="userInfo"><b>User Information</b></span>
                <span className="info">City: {user.city}</span>
                <span className="info">From: {user.from}</span>
                <span className="info">Relationship: Single</span>
            </div>
            <span className="userFriend"><b>User Friends</b></span>
            <div className="Fcontainer">
                <div className="userFriends">
                    <img className="ppsidebarImg" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                    <span>Lorem, ipsum.</span>
                </div>
                <div className="userFriends">
                    <img className="ppsidebarImg" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                    <span>Lorem, ipsum.</span>
                </div>
                <div className="userFriends">
                    <img className="ppsidebarImg" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                    <span>Lorem, ipsum.</span>
                </div>
                <div className="userFriends">
                    <img className="ppsidebarImg" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                    <span>Lorem, ipsum.</span>
                </div>
                <div className="userFriends">
                    <img className="ppsidebarImg" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                    <span>Lorem, ipsum.</span>
                </div>
            </div>
           
        </div>
    )
}
