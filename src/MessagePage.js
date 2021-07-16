import './MessagePage.css'
import Message from './Message'
import MessageBox from './MessageBox'
import Channel from './Channel'
import PopupCont from './Popup'
import UserChannel from './UserChannel'
import axios from 'axios'
import { TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Popup from 'reactjs-popup'
import Nav from './Nav'

function uChannelName(f,s) {
    if(f<s) {
        return("pms-" + f+s);
    }
    return("pms-"+s+f)
}

function MessagePage (props) {
    const [messages, setMessages] = useState([]);
    const [channels, setChannels] = useState([]);
    const [users, setUsers] = useState([]);
    const [channel, setChannel] = useState("General")
    const [channelText, setChannelText] = useState()
    const [editOpen, setEditOpen] = useState(false)
    const [editText, setEditText] = useState("")
    const [editId, setEditId] = useState("")
    const [drawer, setDrawer] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:5000/channels')
        .then(response => setChannels(response.data))
    },[])

    useEffect(() => {
        axios.get('http://localhost:5000/users')
        .then(response => setUsers(response.data))
    },[])

    useEffect(() => {
        axios.get('http://localhost:5000/messages?channel=' + channel)
        .then(response => setMessages(response.data))
    },[channel])
    
    let addMessage = (mess) => {
        setMessages([...messages, mess])
        props.socket.emit("sendMessage", mess)
    }

    const openEditPopup = (mess, id) => {
        setEditText(mess)
        setEditOpen(true)
        setEditId(id)
    }

    const closeEditPopup = () => {
        setEditText("");
        setEditOpen(false)
    }

    let editMessage = (mess, id) => {
        axios.put('http://localhost:5000/messages/edit', {
                id: id,
                newMessage: mess
            }
        ).then(() =>{
            props.socket.emit("editMessage", {
                channel: channel,
                id: id,
                message: mess
            });
            axios.get('http://localhost:5000/messages?channel=' + channel)
            .then(response => setMessages(response.data))
        })
        setEditOpen(false)
    }

    let deleteMessage = (id) => {
        props.socket.emit("deleteMessage", id)
        axios.delete('http://localhost:5000/messages/delete', { data: {id: id}}) 
        setMessages(m => [...m].filter(x => x._id !== id))

    }

    let addChannel = () => {
        axios.post('http://localhost:5000/channels/new', {
            creator: props.username,
            name: channelText
        }).then(() => {
            setChannels(c => [...c, {channel: channelText}])
            props.socket.emit("addChannel", {
                creator: props.username,
                name: channelText
            })
        })
    }

    useEffect(() => {
        if(props.socket !== undefined) {
            props.socket.on('newMessage', data => {
                setMessages(m => [...m, data]);
            })
            props.socket.on("delMessage", data => {
                setMessages(m => [...m].filter(x => x._id !== data))
            })
            props.socket.on("messageEdited", data => {
                if(data.channel === channel) {
                    setMessages(m => [...m].map(x => {
                        if(x._id === data.id) {
                            x.message = data.message
                        }
                        return (x)
                    }))
                }
            })
            props.socket.on("channelAdded", data => {
                setChannels(c => [...c, {channel: data.name}])
            })
        }
    }, [props.socket])

    return (
        <div id="messagePage">
            <Nav open={drawer} onClick={() => setDrawer(d => !d)}></Nav>
            <div id="messages">
                {
                    messages.slice(0).reverse().map((x,i) => {
                        return(
                            <Message setChannel={setChannel} editFunc={openEditPopup} edited={x.edited ? x.edited : false} time={x.time} deleteFunc={deleteMessage} dbId={x._id} key={i} loggedInAs={props.username} username={x.username} name={x.name} content={x.message}></Message>
                        )
                    })
                }
                <Popup modal open={editOpen}>
                    <PopupCont title="Edit Message" onSubmit={() => {editMessage(editText, editId)}} close={closeEditPopup}>
                        <TextField onChange={e=>setEditText(e.target.value)} defaultValue={editText} className={"fullWidth"} variant="outlined" />
                    </PopupCont>
                </Popup>
            </div>
            <MessageBox username={props.username} name={props.name} channel={channel} addMessage={addMessage}></MessageBox>
            <div id="channels" onClick={() => setDrawer(false)} className={(drawer ? "openChannels" : "")}>
                <div className="logoutBar">
                    <ExitToAppIcon style={{color: 'white'}} onClick={props.logout} /><span>{"Logged in as " + props.name}</span>
                </div>
                <div className="channelsHeader">Channels</div>
                {
                    channels.slice(0).sort().map((x,i) => {
                        return (
                            <Channel key={i} select={setChannel} selected={channel} name={x.channel} />
                        )
                    })
                }
                <Popup modal trigger={
                    <div className="channelButtons">
                        <AddCircleIcon />
                    </div>
                } position="center center">
                    {close => (
                        <PopupCont title="Add New Channel" close={close} onSubmit={() => {addChannel(); close();}}>
                            <TextField onChange={e=>setChannelText(e.target.value)} placeholder={"Channel Name"} className="fullWidth" variant="outlined"/>
                        </PopupCont>
                    )}
                </Popup>
                <div className="channelsHeader">Users</div>
                {
                    users.slice(0).sort().map((x,i) => {
                        return (
                            (props.username !== x.username ? <UserChannel key={i} select={setChannel} selected={channel} name={x.name} channel={uChannelName(props.username,x.username)} username={x.username} /> : "")
                        )
                    })
                }
            </div>

        </div>
    )
}

export default MessagePage