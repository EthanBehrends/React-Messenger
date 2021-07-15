import './UserChannel.css'

function UserChannel(props) {
    return (
        <div className={"user-channel " + (props.selected === props.channel ? "selected" : "")} onClick={() => props.select(props.channel)}>
            <div className="uc-name">
                {props.name}
            </div>
            <div className="uc-uname">
                ({props.username})
            </div>
        </div>
    )
}

export default UserChannel;