import React, { useState } from 'react'
import {Link} from 'react-router-dom';

function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
    <div className='join'>
        <h1>Join Chat</h1>
        <form>
            <input
                placeholder='Name'
                type='text'
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <input
                placeholder='Room'
                type='text'
                value={room}
                onChange={(e)=>setRoom(e.target.value)}
            />
            <Link onClick={(e)=> (!name || !room)? e.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
                <button>Join</button>   
            </Link>
            
        </form>
            
    </div>
    )
}

export default Join
