import './MessageBox.css'
import axios from 'axios'
import { useState } from 'react'
import { TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

function MessageBox(props) {
    const [message, setMessage] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const postData = {
            username: props.username,
            message: message,
            name: props.name,
            channel: props.channel
        }

        setMessage("")
        props.addMessage(postData)

        axios.post('http://localhost:5000/messages/send', postData)
    }

    return (
        <div id="messageBox">
            <form onSubmit={e => onSubmit(e)}>
                <TextField fullWidth id="textbox" variant="outlined" onChange={e => setMessage(e.target.value)} value={message} multiline rows={3} placeholder="Send a message..." />
                <div id="submitCont">
                    <button id="submit" type="submit"><SendIcon /></button>
                </div>
            </form>
        </div>
    )
}

export default MessageBox