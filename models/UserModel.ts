export default interface UserModel{
    id : string
    name : string,
    twitterId : string
    handle : string,
    imageURL : string,
    joiningDate : string,
    activeDays : number,
    currentStreak : number,
    longestStreak : number,
    targetFollowers: number,
    followers : number,
    following : number,
    tweets : number,
    lastTweetDateAndTime : string
}