import React, { useEffect, useRef, useState } from "react"
import Consistency from "../models/Consistency"

type HeatmapProps = {
    values: Consistency[],
    startDate : string
}

const Heatmap = ({values,startDate}:HeatmapProps)=>{
    const [points,setPoints] = useState<Consistency[]>([])
    const [max,setMax] = useState<number>(0);
    useEffect(()=>{
        setPoints([]);
        let d = new Date(startDate)
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
        <div className="w-fit overflow-x-scroll">
            <div className="grid grid-rows-7 grid-flow-col gap-1">
                {points.map((v) => <Cell max={max} date={v.date}  value={v.count}/>)}
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
            <div className=" absolute theme-bg-accent rounded-md -translate-x-1/2 p-2 -translate-y-16 flex-col z-20" style={{display:displayTooltip ? "flex":"none"}}>
                <p className="theme-text-accent">date: {date}</p>
                <p className="theme-text-accent">Tweets: {value}</p>
            </div>
            <div onMouseLeave={()=>setDisplayToolTip(false)} onMouseEnter={()=>setDisplayToolTip(true)} className={`w-full h-full rounded-sm ${isActive ? "bg-[#57FF4E] hover:cursor-pointer" : "theme-bg-accent"}`} style={{opacity:opacity}}></div>
        </div>
    )
}

export default Heatmap
