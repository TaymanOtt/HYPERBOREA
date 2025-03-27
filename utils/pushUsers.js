async function pushUsers(){
  const tempUser = await getUsers();
  console.log(tempUser);
  users.splice(0, users.length);
  tempUser.forEach(user => users.push(user));
  //console.log(users);
  }
