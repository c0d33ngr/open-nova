import {useRouter} from "next/router"
import { useEffect } from "react"
import Router from "next/router"
import twitterClient from "../../twitter"
import getBaseUrl from "../../helpers/getBaseUrl"

const Token = ({state}:any)=>{
    return(
        <div>
            <p className="text-white">{state}</p>
        </div>
    )
}

export async function getServerSideProps(data:any){
    // const redirectURL:string = data.req.headers.referer.split("?")[0]
    let state = "failed"
    try{
        const res = await twitterClient.getTokens(getBaseUrl()+"/auth/token",data.query.state,data.query.code)
        state = "authenticated"
    }catch(e){
        state = "failed"
    }
    
    return{
        props:{state}
    }
}

//http://localhost:3000/auth/token?state=state&code=ZVFwWE1kNjd5b3lvbU5SVFhDV24xc3cta1ltaFpHWUpQNnRfLWozcDdaMmlPOjE2NzA1MTkzNzEzOTQ6MTowOmFjOjE
export default Token