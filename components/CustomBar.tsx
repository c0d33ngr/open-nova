import { useEffect, useState } from "react"

type CustomBarType = {
    labels : any[],
    values: number[]
}

const CustomBar = ({labels , values}:CustomBarType) =>{
    const [max,setMax] = useState(Math.max(...values))
    const [min,setMin] = useState(Math.min(...values))
    const [valueLabels,setValuseLabels] = useState<number[]>([]);
    const [steps,setSteps] = useState<number>(0)
    useEffect(()=>{
        let tempMin = min
        let tempMax = max
        if(max % 5 != 0){
            tempMax = max+5-(max%5) 
            setMax(tempMax)
        }
        if(min % 5 != 0){
            tempMin = min < 0 ? min-(5+min%5) : min-(min%5)
            setMin(tempMin)
        }
        const tempSteps = (tempMax-tempMin)/5
        setSteps(tempSteps)
        setValuseLabels([])
        for(let i=tempMin;i<=tempMax;i+=tempSteps) setValuseLabels(prev => [...prev,i])
    },[])
    return(
        <div className="w-full h-full flex flex-row items-end justify-start bg-white">
            <div>{max+" "+min}</div>
            <div className="h-full w-full bg-slate-500 flex flex-col justify-start items-stretch">
                {values.map(v=>{
                    const per = Math.ceil((v-min)*100/(max-min))
                    return <div className=" bg-green-400 h-3 mb-2" style={{width:`${per}%`}}>{per+" "+v}</div>
                })}
                <div className="flex flex-row justify-between">{valueLabels.map(v=><p>{v}</p>)}</div>
            </div>
        </div>
    )
}

export default CustomBar