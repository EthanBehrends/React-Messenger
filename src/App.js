import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MessagePage from './MessagePage'
import SignUp from './SignUp'
import LogIn from './LogIn'
import { io } from 'socket.io-client'
import { useState } from 'react'
import { useEffect } from 'react';

function App() {
  const [socket,setSocket] = useState();
  const [user, setUser] = useState();
  const [name, setName] = useState();

  const logout = () => setUser(undefined);

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);

    return() => {
      s.disconnect();
    }
  }, [])

  return (
    <Router>
      <Route path="/" exact>
        {user ? <MessagePage name={name} username={user} logout={logout} socket={socket}/> : <Redirect to="/login" />}
      </Route>
      <Route path="/signup" exact>
        {user ? <Redirect to="/" /> : <SignUp socket={socket}/>}
        
      </Route>
      <Route path="/login" exact>
        {user ? <Redirect to="/" /> : <LogIn setUser={setUser} setName={setName} socket={socket}/>}

        
      </Route>
    </Router>
  );
}

export default App;
