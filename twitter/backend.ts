import axios from "axios"
import CustomError from "../types/CustomError"
import TwitterTokens from "../types/TwitterTokens"
import {twitterClientId , twitterClientSecret, scopes, state} from "./config"

// backend code
function auth(redirectURL:string){
    console.log(window.location)
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${twitterClientId}&redirect_uri=${redirectURL}&scope=${scopes.join('%20')}&state=${state}&code_challenge=challenge&code_challenge_method=plain`
    window.location.replace(authUrl)
}

// backend code
function getTokens(redirectURL:string,state:string,code:string){
    return new Promise<TwitterTokens>(async(resolve,reject) => {
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
            const tokens: TwitterTokens = {
                tokenType : res.data.token_type,
                accessToken : res.data.access_token,
                refreshToken : res.data.refresh_token,
                scope : res.data.scope
            }
            resolve(tokens)
        }catch(e){
            const err: CustomError = {message : 'Unavle to authenticate user',err:e}
            reject(err)
        }
    })
}


export default {auth,getTokens}