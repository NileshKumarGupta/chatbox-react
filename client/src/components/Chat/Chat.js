import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

let socket;

var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};

const Chat = ({location}) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const ENDPOINT = 'https://chatbox-react-b.herokuapp.com/'
  // const ENDPOINT = 'localhost:5000';

  useEffect(() =>{
    const {name, room} = queryString.parse(location.search);

    // console.log(name, room);

    socket = io(ENDPOINT, connectionOptions);

    setName(name);
    setRoom(room);

    socket.emit('join', {name, room}, ({error}) => {
      if(error)
        console.log(error);
    })

    return () => {
      socket.emit('disconnect');
      
      socket.off();
    }

  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();

    if(message){
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">

        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>

      </div>
    </div>
  );
}

export default Chat;