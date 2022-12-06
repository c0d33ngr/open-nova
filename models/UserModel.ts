export default interface UserModel{
    name : string,
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