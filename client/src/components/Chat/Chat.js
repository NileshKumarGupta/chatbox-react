import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

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
  const ENDPOINT = 'localhost:5000'

  useEffect(() =>{
    const {name, room} = queryString.parse(location.search);

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

  return (
    <h1>Chat</h1>
  );
}

export default Chat;