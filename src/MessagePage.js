import './MessagePage.css'
import Message from './Message'
import MessageBox from './MessageBox'
import axios from 'axios'
import { useEffect, useState } from 'react'

function MessagePage (props) {
    const [messages, setMessages] = useState([]);
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
                            <Message key={i} username={x.username} name="Ethan" content={x.message}></Message>
                        )
                    })
                }
            </div>
            <MessageBox addMessage={addMessage}></MessageBox>
            <div id="channels">

            </div>
        </div>
    )
}

export default MessagePage