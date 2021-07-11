import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MessagePage from './MessagePage'
import SignUp from './SignUp'
import { io } from 'socket.io-client'
import { useState } from 'react'
import { useEffect } from 'react';

function App() {
  const [socket,setSocket] = useState();
  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);

    return() => {
      s.disconnect();
    }
  }, [])

  return (
    <Router>
      <Route path="/" exact><MessagePage socket={socket}></MessagePage></Route>
      <Route path="/signup" exact><SignUp socket={socket}></SignUp></Route>
    </Router>
  );
}

export default App;
