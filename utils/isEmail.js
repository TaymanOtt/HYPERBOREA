function isEmail(email){
    let hasCharacters = false;
    let hasBadChars = false;
    const badChars = ['[',']', '=', '^', '$', '?', '!', '\\', '"', "'", ';',
     ':', '(', ')', '/', '*', '|', '#', '%', '>', '<', ',', ' ']
    for(let i = 0; i < badChars.length; i++){
     if(email.includes(badChars[i]) || email.length < 1){
       hasBadChars = true;
       break;
     }
    }
      if(hasBadChars){
       return false;
      }
    if(!email.includes('@') && !email.includes('.')){
      return false;
    } else {
      hasCharacters = true;
    }
    if (email.length > 7 && hasCharacters){
     return true;
    }
    return false;
    }