import React, { useEffect, useRef, useState } from "react"
import Consistency from "../models/Consistency"

type HeatmapProps = {
    values: Consistency[],
    startDate : string
}

const Heatmap = ({values,startDate}:HeatmapProps)=>{
    const [points,setPoints] = useState<Consistency[]>([])
    const [max,setMax] = useState<number>(0);
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    useEffect(()=>{
        setPoints([]);
        let d = new Date(startDate)
        while(d.getDate() != 1){
            d.setDate(d.getDate()-1);
            setPoints(prev => [{date:`${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`,count:NaN},...prev])
        }
        while(d.getDay() != 0){
            d.setDate(d.getDate()-1)
            setPoints(prev => [{date:`${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`,count:NaN},...prev])
        }
        setPoints(prev =>{
            return [...prev,...values];
        })
        setMax(Math.max(...values.map(v=> v.count)))
    },[])
    return(
        <div className="w-fit">
            <div className=" w-full flex flex-row justify-evenly h-fit pl-3">
                {months.map((m) => <p className=" font-medium text-xs theme-text">{m}</p>)}
            </div>
            <div className="w-full h-fit flex flex-row justify-start items-center">
                <div className="grid grid-rows-7 grid-flow-col gap-1 mt-4">
                    {days.map((d,i) => <div className="theme-text p-0 m-0 text-xs">{i % 2 != 0 && d}</div>)}
                </div>
                <div className="grid grid-rows-7 grid-flow-col gap-1 mt-0">
                    {points.map((v) => <Cell max={max} date={v.date}  value={v.count}/>)}
                </div>
            </div>
        </div>
    )
}

type CellProps = {
    date : string,
    value : number,
    max : number
}

const Cell = ({date, value, max} : CellProps)=>{
    const [opacity,setOpacity] = useState<number>(value/max);
    const [isActive,setIsActive] = useState<boolean>(!Number.isNaN(value));
    const [displayTooltip,setDisplayToolTip] = useState<boolean>(false)
    useEffect(()=>{
        setIsActive(!Number.isNaN(value))
    },[])

    return(
        <div className=" w-3 h-3 cell rounded-sm">
            <div className=" absolute theme-bg rounded-md -translate-x-1/2 p-2 -translate-y-16 flex-col z-20" style={{display:displayTooltip && isActive ? "flex":"none"}}>
                <p className="theme-text-accent">date: {date}</p>
                <p className="theme-text-accent">Tweets: {value}</p>
            </div>
            <div onMouseLeave={()=>setDisplayToolTip(false)} onMouseEnter={()=>setDisplayToolTip(true)} className={`w-full h-full rounded-sm ${isActive ? "bg-[#57FF4E] hover:cursor-pointer" : "theme-bg-accent"}`} style={{opacity:opacity}}></div>
        </div>
    )
}

export default Heatmap
