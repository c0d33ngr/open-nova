import { initializeApp } from "firebase/app"
import { getFirestore,getDoc, updateDoc, doc, addDoc, collection, where, getDocs, query, setDoc } from "firebase/firestore/lite"
import UserModel from "../models/UserModel"
import CustomError from "../types/CustomError"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


function createOrUpdateUser(user:UserModel){
    return new Promise<UserModel>(async(resolve,reject) => {
        try{
            const {docs} = await getDocs(query(collection(db,"users"),where("twitterId","==",user.twitterId)))
            if(docs.length == 0){
                const newUser:any = {...user}
                delete newUser.id
                const fbUser = await addDoc(collection(db,"users"),newUser)
                user.id = fbUser.id
            }else{
                const updatedUser = docs[0].data()
                updatedUser.name = user.name,
                updatedUser.twitterId = user.twitterId,
                updatedUser.handle = user.handle,
                updatedUser.imageURL = user.imageURL,
                updatedUser.followers = user.followers,
                updatedUser.following = user.following,
                updatedUser.tweets = user.tweets
                delete updatedUser.id
                await setDoc(doc(db,"users",docs[0].id),updatedUser,{merge:true})
                user = <UserModel>updatedUser
                updatedUser.id = docs[0].id
            }
            
            resolve(user)
        }catch(e){
            const error : CustomError = {message : "Unable to update User",err:e}
            reject(error)
        }
    })
}

function getUserFromDb(userId:string){
    return new Promise<UserModel | null>(async(resolve,reject) => {
        try{
            const res = await (await getDoc(doc(db,"users",userId)))
            if(!res.exists()){
                return resolve(null)
            }
            return resolve(<UserModel>res.data())
        }catch(e){
            const error: CustomError = {message : "Unable to get user from db",err:e}
            reject(error)
        }
    })
}

export {createOrUpdateUser}