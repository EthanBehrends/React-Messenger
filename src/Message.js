import './Message.css'

function Message (props) {
    return (
        <div className="messageCont">
            <div className="name">{props.name}<div className="username">{props.username}</div></div>
            <div className="messageContent">{props.content}</div>
        </div>
    )
}

export default Message