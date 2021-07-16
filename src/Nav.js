import './Nav.css'
import MenuIcon from '@material-ui/icons/Menu';

function Nav(props) {
    return (
        <div id="Navigation" className={(props.open ? "open" : "")}>
            <MenuIcon onClick={props.onClick} />
        </div>
    )
}

export default Nav;