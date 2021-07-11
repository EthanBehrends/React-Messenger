import './MessagePage.css'
import Message from './Message'
import MessageBox from './MessageBox'
import Channel from './Channel'
import axios from 'axios'
import { useEffect, useState } from 'react'

function MessagePage (props) {
    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState("General")

    useEffect(() => {
        axios.get('http://localhost:5000/messages')
        .then(response => setMessages(response.data))
    },[])
    
    let addMessage = (mess) => {
        setMessages([...messages, mess])
        props.socket.emit("sendMessage", mess)
    }

    useEffect(() => {
        if(props.socket !== undefined) {
            props.socket.on('newMessage', data => {
                setMessages(m => [...m, data]);
            })
        }
    }, [props.socket])

    return (
        <div id="messagePage">
            <div id="messages">
                {
                    messages.slice(0).reverse().map((x,i) => {
                        return(
                            <Message key={i} username={x.username} name={x.name} content={x.message}></Message>
                        )
                    })
                }
            </div>
            <MessageBox channel={channel} addMessage={addMessage}></MessageBox>
            <div id="channels">
                <div className="channelsHeader">Channels</div>
                <Channel selected name="General" />
                <Channel name="Video Games" />
                <Channel name="Software Development" />
                <div className="channelsHeader">Users</div>
            </div>
        </div>
    )
}

export default MessagePage