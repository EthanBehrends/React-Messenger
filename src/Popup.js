import './Popup.css'
import { TextField, Button} from '@material-ui/core'

function Popup (props) {
    return (
        <div className="popUp">
            <h1>{props.title ? props.title : "Popup Title"}</h1>
            {props.children}
            <Button onClick={props.onSubmit} style={{marginTop: 20, marginRight: 20}} color="primary" variant="contained">Confirm</Button>
            <Button onClick={props.close} style={{marginTop: 20}}>Cancel</Button>
        </div>
    )
}

export default Popup;