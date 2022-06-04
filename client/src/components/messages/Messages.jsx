import './messages.css'

export default function Messages() {
    return (
        <>
            <div className="messages">
                <div className="messageCon">
                    <img className="messageImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShI3ATJ2L06Tbbi2v2zhP2736dEHSgXZ7yFg&usqp=CAU" alt="" />
                    <span className="messageDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At blanditiis qui atque aspernatur repellendus voluptate esse, ab beatae! Molestiae nobis dolorum repellendus veniam sunt maxime consequuntur excepturi magni nisi sit.</span>
                    <span className="messageTime">1 hour ago</span>
                </div>
                <div className="messageConOwn">
                    <img className="messageImgOwn" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShI3ATJ2L06Tbbi2v2zhP2736dEHSgXZ7yFg&usqp=CAU" alt="" />
                    <span className="messageDescOwn">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, dignissimos commodi consequuntur nam optio quod magni odit aliquid a placeat iusto qui iure sequi facere sed enim at amet voluptate. </span>
                    <span className="messageTimeOwn">1 hour ago</span>
                </div>
            </div>
        </>
    )
}
