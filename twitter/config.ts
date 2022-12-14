let twitterClientId:string = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!
let twitterClientSecret: string = process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET!
let scopes:string[] = ["tweet.read","users.read","follows.read","offline.access"]
let state:string = (Math.random()*1000).toString()

export {twitterClientId, twitterClientSecret, scopes, state}