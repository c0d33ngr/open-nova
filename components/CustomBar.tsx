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
        <div className="w-full h-full flex flex-row items-start justify-start">
            <div className=" mr-2">
                {labels.map((l,i) => <p className=" theme-text flex justify-center items-center h-5 mb-5">{l}</p>)}
            </div>
            <div className="h-full w-full flex flex-col justify-start items-stretch">
                {values.map(v=><Bar value={v} min={min} max={max} />)}
                <div className="relative flex flex-row h-6">{valueLabels.map((v,i)=><ValueCell value={v} index={i} lastIndex={valueLabels.length-1} min={min} max={max}  />)}</div>
            </div>
        </div>
    )
}

type BarType = {
    value : number,
    min : number,
    max : number
}

const Bar = ({value,min,max}:BarType) => {
    const per = Math.ceil((value-min)*100/(max-min))
    return <div className=" bg-[#00DAD9] h-5 rounded-r-full mb-5" style={{width:`${per}%`}}></div>
}

type ValueCellType = {
    value : number,
    index : number,
    lastIndex : number,
    min : number,
    max : number
}

const ValueCell = ({value,index,lastIndex,min,max} : ValueCellType)=>{
    const translate = index == lastIndex ? " -translate-x-full" : " -translate-x-1/2"
    const left = Math.ceil((value-min)*100/(max-min))
    return(
        <div style={{left:`${left}%`}} className={" theme-text absolute "+translate}>{value}</div>
    )
}

export default CustomBar