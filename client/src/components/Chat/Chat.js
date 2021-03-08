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
  const ENDPOINT = 'localhost:5000'

  useEffect(() =>{
    const {name, room} = queryString.parse(location.search);

    socket = io('localhost:5000', connectionOptions);

    setName(name);
    setRoom(room);

  }, [ENDPOINT, location.search]);

  return (
    <h1>Chat</h1>
  );
}

export default Chat;