import WithNavbar from "../../components/WithNavbar"
import checkImage from "../../assets/checked.png"
import currentStreakImage from "../../assets/Current-streak.png"
import wallClockImage from "../../assets/wall-clock.png"
import Image from "next/image"

const Dashboard = ()=>{
    return(
        <WithNavbar>
            <div className="mx-10 mt-3 w-full">
                <section className="w-full h-10">
                    <h2 className=" theme-text font-semibold text-xl">Hello, Evelyn Finley</h2>
                </section>
                <section className="w-full flex flex-row items-center justify-between mt-3">
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
            </div>
        </WithNavbar>
    )
}

export default Dashboard