import './MessageBox.css'
import axios from 'axios'
import { useState } from 'react'

function MessageBox(props) {
    const [message, setMessage] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const postData = {
            username: "ethanBehrends",
            message: message
        }

        setMessage("")
        props.addMessage(postData)

        axios.post('http://localhost:5000/messages/send', postData)
    }

    return (
        <div id="messageBox">
            <form onSubmit={e => onSubmit(e)}>
                <textarea id="textbox" onChange={e => setMessage(e.target.value)} value={message} placeholder="Send a message..."></textarea>
                <input id="submit" type="submit"></input>
            </form>
        </div>
    )
}

export default MessageBox