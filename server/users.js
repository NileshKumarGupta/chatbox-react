const users = []

const addUser = ({id, name, room}) => {

  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(existingUser){
    return { error: 'Username is Taken'};
  }

  const user = {id, name, room};
  users.push(user);

  return {user};
}

const removeUser = (id) => {
  let index = users.findIndex((user) => user.id === id);
  if(index != -1){
    let req_user = users.splice(index, 1)[0];
    // console.log('removeUser function\n');
    // console.log(index, req_user)
    // console.log(users);
    return req_user;
  }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.find((user) => user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};