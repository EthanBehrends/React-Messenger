import './Message.css'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

function Message (props) {
    return (
        <div className="messageCont">
            <div className="delEdit">
                <EditIcon></EditIcon>
                <DeleteForeverIcon onClick={() => props.deleteFunc(props.dbId)}/>
            </div>
            <div className="name">{props.name}<div className="username">{props.username}</div></div>
            <div className="messageContent">{props.content}</div>
        </div>
    )
}

export default Message