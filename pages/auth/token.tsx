import {useRouter} from "next/router"
import { useEffect } from "react"
import Router from "next/router"
import twitterClient from "../../twitter"
import getBaseUrl from "../../helpers/getBaseUrl"

const Token = ({authenticated}:any)=>{
    
    return(
        <div>
            <p className="text-white">{authenticated ? "Authenticated" : "Authentication failed"}</p>
        </div>
    )
}

export async function getServerSideProps(data:any){
    let authenticated = false;
    try{
        const res = await twitterClient.getTokens(getBaseUrl()+"/auth/token",data.query.state,data.query.code)
        authenticated = true
    }catch(e:any){
        authenticated = false
    }
    
    return{
        props:{authenticated}
    }
}

//http://localhost:3000/auth/token?state=state&code=ZVFwWE1kNjd5b3lvbU5SVFhDV24xc3cta1ltaFpHWUpQNnRfLWozcDdaMmlPOjE2NzA1MTkzNzEzOTQ6MTowOmFjOjE
export default Token