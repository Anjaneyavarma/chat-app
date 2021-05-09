const { Socket } = require("socket.io-client");

const users = [];

const addUser =(id, name, room)=>{
    

    const existingUser = users.find((user)=> user.room===room && user.name ===name);

    if(existingUser){
        return {error: 'User is alrady taken'}
    }

    const user = {id, name, room}

    users.push(user);

    console.log(users)

    return { user }

   
}

const removeUser =(id)=>{
    const index = users.findIndex((user)=> user.id === id)
    if(index!==1){
        return users.splice(index, 1)[0];
    }


}

const getUser =(id)=>users.find((user)=> user.id===user);

const getUserInRoom =(room)=>users.filter( (user)=> user.room===room);

module.exports = {addUser, removeUser, getUser, getUserInRoom};