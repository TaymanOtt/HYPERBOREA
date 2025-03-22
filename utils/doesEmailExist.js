function doesEmailExist(email){
    let check = false;
    users.forEach(user => {
    console.log(user.email);
    if (user.email === email){
        check = true;
    }
    })
        return check;
    }