import Router from "next/router"
import { useEffect } from "react"
import twitterClient from "../../twitter"

const Auth = ()=>{
    const loginWithTwitter = ()=>{
        twitterClient.auth(window.location.href+"/token")
    }
    return(
        <div>
            <button onClick={loginWithTwitter} className=" bg-blue-600">Login with Twitter</button>
        </div>
    )
}

export async function getStaticProps(){
    return {
        props : {}
    }
}

export default Auth