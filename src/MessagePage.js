import './MessagePage.css'
import Message from './Message'
import MessageBox from './MessageBox'
import Channel from './Channel'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function MessagePage (props) {
    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState("General")

    useEffect(() => {
        axios.get('http://localhost:5000/messages?channel=' + channel)
        .then(response => setMessages(response.data))
    },[channel])
    
    let addMessage = (mess) => {
        setMessages([...messages, mess])
        props.socket.emit("sendMessage", mess)
    }

    let deleteMessage = (id) => {
        props.socket.emit("deleteMessage", id)
        axios.delete('http://localhost:5000/messages/delete', { data: {id: id}}) 
        setMessages(m => [...m].filter(x => x._id !== id))

    }

    useEffect(() => {
        if(props.socket !== undefined) {
            props.socket.on('newMessage', data => {
                setMessages(m => [...m, data]);
            })
            props.socket.on("delMessage", data => {
                setMessages(m => [...m].filter(x => x._id !== data))
            })
        }
    }, [props.socket])

    return (
        <div id="messagePage">
            <div id="messages">
                {
                    messages.slice(0).reverse().map((x,i) => {
                        return(
                            <Message deleteFunc={deleteMessage} dbId={x._id} key={i} username={x.username} name={x.name} content={x.message}></Message>
                        )
                    })
                }
            </div>
            <MessageBox username={props.username} name={props.name} channel={channel} addMessage={addMessage}></MessageBox>
            <div id="channels">
                <ExitToAppIcon style={{color: 'white'}} onClick={props.logout} />
                <div className="channelsHeader">Channels</div>
                <Channel select={setChannel} selected={channel} name="General" />
                <Channel select={setChannel} selected={channel} name="Video Games" />
                <Channel select={setChannel} selected={channel} name="Software Development" />
                <div className="channelsHeader">Users</div>
            </div>
        </div>
    )
}

export default MessagePage