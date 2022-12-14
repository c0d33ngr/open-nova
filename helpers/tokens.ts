function saveToken(tokenType:"access"|"refresh",token:string){
    localStorage.setItem(`twitter_${tokenType}_token`,token)
}

function getToken(tokenType:"access"|"refresh"){
    return localStorage.getItem(`twitter_${tokenType}_token`)
}

export {saveToken,getToken}