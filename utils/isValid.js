function isValid(string){
    if (string.length > 20 || string.length < 1){
     return false;
    }
      const badChars =['[',']', '=', ' ', '^', '$', '?', '!', '\\', '"', "'",
   ':', '(', ')', '/', '*', '|', '#', '%', '>', '<', ','];
    let hasBadChars = false;
    for (let i = 0; i < badChars.length; i++){
     if (string.includes(badChars[i])){
       hasBadChars = true;
       break;
     }
    }
      return !hasBadChars;
  }