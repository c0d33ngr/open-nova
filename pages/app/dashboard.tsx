import WithNavbar from "../../components/WithNavbar"
import checkImage from "../../assets/checked.png"
import currentStreakImage from "../../assets/Current-streak.png"
import wallClockImage from "../../assets/wall-clock.png"
import Image from "next/image"
import UserImage from "../../dummy/user.jpg"
import Consistency from "../../models/Consistency"
import Heatmap from "../../components/Heatmap"

type DashboardProps = {
    consitency : any[]
}

const Dashboard = ({consitency} : DashboardProps)=>{
    return(
        <WithNavbar>
            <div className="mx-10 mt-3 w-full flex flex-row">
                <div className="w-2/3">
                    <section className="w-full h-10">
                        <h2 className=" theme-text font-semibold text-xl">Hello, Evelyn Finley</h2>
                    </section>
                    <section className="w-full flex flex-col items-start justify-start p-2">
                        {/* top icons */}
                        <section className="w-full flex flex-row justify-around">
                            {/* active days */}
                            <div className="px-2 py-1 flex flex-col items-center justify-center theme-text">
                                <div><Image src={checkImage} alt="active days" height="50%" width="50%" /></div>
                                <p className="text-2xl font-semibold">842</p>
                                <p className="text-lg text-secondary font-semibold mt-2">Total Active Days</p>
                                <p className="text-sm font-medium mt-1">May 24, 2020 - Presect</p>
                            </div>
                            {/* cur streak */}
                            <div className="px-2 py-1 flex flex-col items-center justify-center theme-text">
                                <div className=" relative">
                                    <Image src={currentStreakImage} alt="Current streak" width="100%" height="100%" />
                                    <p className=" text-2xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">25</p>
                                </div>
                                <p className="text-lg text-secondary font-semibold mt-2">Current Streak</p>
                                <p className="text-sm font-medium mt-1">Aug 23 - Sept 16</p>
                            </div>
                            {/* longest streak */}
                            <div className="px-2 py-1 flex flex-col items-center justify-center theme-text">
                                <div><Image src={wallClockImage} alt="active days" height="50%" width="50%" /></div>
                                <p className="text-2xl font-semibold">25</p>
                                <p className="text-lg text-secondary font-semibold mt-2">Longest Streak</p>
                                <p className="text-sm font-medium mt-1">Aug 23 - Sept 16</p>
                            </div>
                        </section>
                        <section className="theme-bg-accent mt-5 rounded-lg fex flex-col justify-start items-center w-full overflow-x-scroll py-2 px-3">
                            <div className="bg-primary w-fit rounded-md py-1 px-2 text-white text-sm font-medium mb-3">Consitency</div>
                            <Heatmap startDate="2022/1/12" values={consitency} />
                        </section>
                    </section>
                </div>
                <section className="w-1/3 p-2">
                    <div className=" w-full h-auto flex flex-row items-center justify-end">
                        <Image className=" rounded-full" width="50px" height="50px" src={UserImage} />
                    </div>
                    <section className=" mt-7 w-full h-auto flex flex-row justify-between items-center">
                        <div className="flex flex-col items-center">
                            <p className="text-[#1DA1F2] font-bold text-m">1,200</p>
                            <p className="text-[#464447] font-normal text-sm">Followers</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-[#1DA1F2] font-bold text-m">500</p>
                            <p className="text-[#464447] font-normal text-sm">Following</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-[#1DA1F2] font-bold text-m">50</p>
                            <p className="text-[#464447] font-normal text-sm">Tweets</p>
                        </div>
                    </section>
                    <section className=" w-full flex flex-col justify-start items-center py-10">
                        <div className="w-full flex flex-row justify-center items-center">
                            <div className="w-2/3 relative h-2 flex flex-col justify-center bg-[#D9D9D9] rounded-full">
                                <div className=" h-[0.6rem] absolute bg-[#57FF4E] rounded-full" style={{width:"65%"}}></div>
                            </div>
                            <p className=" theme-text ml-3">65%</p>
                        </div>
                        <p className=" theme-text font-semibold text-sm mt-3">1200/1500</p>
                        <p className=" text-secondary font-semibold text-sm">Target Followers</p>
                    </section>
                </section>
            </div>
        </WithNavbar>
    )
}

export async function getServerSideProps(){
    const start = new Date(2022,0,12)
    const end = new Date(2022,11,30)
    const consitency : Consistency[] = [];
    while(start <= end){
        // days.push(new Date(start))
        consitency.push({date:`${start.getFullYear()}/${start.getMonth()}/${start.getDate()}`,count: Math.floor(Math.random()*10)})
        start.setDate(start.getDate()+1)
    }

    return{
        props: {
            consitency
        }
    }
}

export default Dashboard