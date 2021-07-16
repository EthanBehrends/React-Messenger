import './Message.css'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);

function uChannelName(f,s) {
    if(f<s) {
        return("pms-" + f+s);
    }
    return("pms-"+s+f)
}

function Message (props) {
    return (
        <div className="messageCont">
            {props.loggedInAs === props.username ? 
                <div className="delEdit">
                    <EditIcon onClick={() => props.editFunc(props.content, props.dbId)}></EditIcon>
                    <DeleteForeverIcon onClick={() => props.deleteFunc(props.dbId)}/>
                </div>
             : "" }
            <div onClick={() => {if(props.loggedInAs !== props.username) props.setChannel(uChannelName(props.loggedInAs, props.username))}} className="name">{props.name}<div className="mTime">{dayjs(props.time).fromNow()}</div></div>
            <div className={"messageContent " + (props.edited ? "edited" : "")}>{props.content}</div>
        </div>
    )
}

export default Message