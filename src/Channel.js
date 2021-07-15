import './Channel.css'

function Channel(props){
    return (
        <div onClick={() => props.select(props.name)} className={"channel " + (props.selected ==props.name ? "selected" : "")}>
            {props.name}
        </div>
    )
}

export default Channel