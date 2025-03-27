async function getUsers(){
try{
  const response = await pool.query("SELECT * FROM users;")
    return response.rows;
}
catch(ex){
    console.log(`Something wrong happened ${ex}`)
}

}

module.exports = getUsers