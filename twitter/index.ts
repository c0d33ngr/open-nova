import axios from "axios"
import { Router } from "next/router";
import { NextResponse } from "next/server";
import CustomError from "../types/CustomError";

let twitterClientId:string = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!
let twitterClientSecret: string = process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET!
let scopes:string[] = ["tweet.read","users.read","follows.read","offline.access"]
let state:string = (Math.random()*1000).toString()


function init(twitterClientId:string, twitterClientSecret: string,scopes?:string[]){
    twitterClientId = twitterClientId
    twitterClientSecret = twitterClientSecret
    if(scopes == undefined){
        scopes = ["tweet.read","users.read","follows.read","offline.access"]
    }
    state = (Math.random()*1000).toString()
    scopes = scopes
}

function auth(redirectURL:string){
    console.log(window.location)
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${twitterClientId}&redirect_uri=${redirectURL}&scope=${scopes.join('%20')}&state=${state}&code_challenge=challenge&code_challenge_method=plain`
    window.location.replace(authUrl)
}

function getTokens(redirectURL:string,state:string,code:string){
    return new Promise(async(resolve,reject) => {
        try{
            const res = await axios.post(
                'https://api.twitter.com/2/oauth2/token',
                {
                    code,
                    "grant_type":"authorization_code",
                    "client_id" : twitterClientId,
                    "redirect_uri" : redirectURL,
                    "code_verifier" : "challenge"
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "Authorization" : "Basic "+ Buffer.from(twitterClientId +":"+twitterClientSecret).toString("base64")
                    }
                }
            );
            
            resolve("solved")
        }catch(e){
            console.log(e)
            reject({message:"err"})
        }
    })
}


export default {init,auth,getTokens}