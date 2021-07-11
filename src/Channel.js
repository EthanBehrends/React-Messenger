import './Channel.css'

function Channel(props){
    return (
        <div className={"channel " + (props.selected ? "selected" : "")}>
            {props.name}
        </div>
    )
}

export default Channel