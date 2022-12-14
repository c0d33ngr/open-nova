function saveUserId(id:string){
    localStorage.setItem("open_nova_user_id",id)
}

function getUserId(){
    return localStorage.getItem("open_nova_user_id")
}

export {saveUserId,getUserId}