import {useRouter} from "next/router"
import { useEffect, useRef } from "react"
import Router from "next/router"
import twitterClient from "../../twitter/backend"
import getBaseUrl from "../../helpers/getBaseUrl"
import TwitterTokens from "../../types/TwitterTokens"
import CustomError from "../../types/CustomError"
import { saveToken } from "../../helpers/tokens"
import axios from "axios"
import UserModel from "../../models/UserModel"
import { createOrUpdateUser } from "../../backend"
import { saveUserId } from "../../helpers/userId"

type TokenProps = {
    tokens : TwitterTokens | null
    error : CustomError | null
}

const Token = ({tokens,error}:TokenProps)=>{
    const calledGetUser = useRef<boolean>(false)
    const getUser = async ()=>{
        if(!tokens) return
        calledGetUser.current = true
        try{
            const {data} = await axios.get("/api/get-twitter-user",{
                params:{
                    accessToken:tokens.accessToken,
                    refreshToken : tokens.refreshToken
                }
            })
            let user:UserModel = data.user
            user = await createOrUpdateUser(user)
            saveUserId(user.id)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        saveToken("access",tokens!.accessToken)
        saveToken("refresh",tokens!.refreshToken)
        if(!calledGetUser.current) getUser()
    },[])

    return(
        <div>
            <p className="text-white">{error && "Unable to Authenticate"}</p>
            {/* <button onClick={redirect} className=" bg-blue-500">Go to Dashboard</button> */}
        </div>
    )
}

export async function getServerSideProps(data:any){
    let tokens: TwitterTokens | null = null
    let error : CustomError | null = null
    try{
        tokens = await twitterClient.getTokens(getBaseUrl()+"/auth/token",data.query.state,data.query.code)
    }catch(e:any){
        console.log(e)
        error = {message : e.message, err: JSON.stringify(e.err)}
    }
    
    return{
        props:{tokens,error}
    }
}


export default Token