import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

function Chat({location}) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const END_POINT = 'localhost:9000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)
        setName(name);
        setRoom(room);

        //END_POINT
        socket = io(END_POINT)
        console.log(socket)

        socket.emit('join', {name, room});
        console.log(name, room)

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [location.search, END_POINT])
    
    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message]);
        })
    },[messages])

    const sendMessage=(e)=>{
        e.preventDefault();

        if(message){
            socket.emit('sendMessage', message, ()=> setMessage(''))
        }
    }

    console.log(message, messages)

    return (
        <div>
            <input
                type='text'
                value={message}
                onChange={(e)=> setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter'? sendMessage(e): 'null'}
            />
        </div>
    )
}

export default Chat
