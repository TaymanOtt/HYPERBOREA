async function addUser(id, name, email, password){
    await sendUser(id, name, email, password);
      const tempUser = await getUsers();
      users.splice(0, users.length)
    tempUser.forEach(user => users.push(user));  
    //console.log(users);
  }