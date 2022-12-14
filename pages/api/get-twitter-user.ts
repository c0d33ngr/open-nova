import axios from "axios"
import {NextApiRequest, NextApiResponse} from "next"
import UserModel from "../../models/UserModel"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    console.log("req@ get-twitter-user")
    try{
        const accessToken = req.query["accessToken"]
        const refreshToken = req.query["refreshToken"]
        const {data,status} = await axios.get("https://api.twitter.com/2/users/me",{
            params:{
                "user.fields":"profile_image_url,public_metrics"
            },
            headers:{
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        const twitterUser: UserModel = {
            id : "",
            name : data.data.name,
            twitterId : data.data.id,
            handle : data.data.username,
            imageURL : data.data.profile_image_url,
            joiningDate : new Date().toISOString(),
            activeDays : 0,
            currentStreak : 0,
            longestStreak : 0,
            targetFollowers : 0,
            followers : data.data.public_metrics.followers_count,
            following: data.data.public_metrics.following_count,
            tweets: 0,
            lastTweetDateAndTime : new Date().toISOString()
        }
        res.status(200).json({user:twitterUser})
    }catch(e:any){
        if(e.response.status == 401){
            res.status(404).json({err:"err"})
        }else{
            res.status(404).json({err:"err"})
        }
    }
}