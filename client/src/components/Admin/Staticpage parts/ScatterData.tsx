import React, { useCallback, useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { IoAnalyticsOutline } from "react-icons/io5";
import axios from 'axios';
import { BsTruck } from "react-icons/bs";
import './style.scss'
const ScatterData = () => {
    type Tmonthly = {
        _id:Number,
        totalSalesbyMoney:number,
        totalSalesbynumber:number
    }
    let [monthly,setmonthly] = useState<Tmonthly[]>([])
    let currYear:number = new Date().getFullYear()
    let years:number[] = []
    for(let i=2024;i<=currYear;i++){
        years.push(i);
    }
    let [pData,setpData] =useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0])
    const [cate,setcate] = useState<string>("Money");
    const [year,setyear] = useState<number>(currYear)
    const [lable,setlable] = useState<string>("amount")
    const [render,setrender] = useState(0);
    const changevalue =(inx:number,data:number)=>{
        let updatedArray = pData.map((ele,index)=>{
            if(index === inx){
                ele = data
            }
            return ele
        })
    }
    const [totalshares,settotalshares] = useState<{totalSalesbyMoney:number,totalSalesbynumber:number}>({})
    const updateData = (type:string,data:Tmonthly[])=>{
        if(type=="Money"){
            setlable("amount");
            let updatedArray = [...pData]
            for(let ele of monthly){
                updatedArray = updatedArray.map((el,index)=>{
                    if(index === ele._id){
                        el = ele.totalSalesbyMoney
                    }
                    return el
                })
            }
            setpData(updatedArray)
        }else{
            setlable("Orders");
            let updatedArray = [...pData]
            for(let ele of monthly){
                updatedArray = updatedArray.map((el,index)=>{
                    if(index === ele._id){
                        el = ele.totalSalesbynumber
                    }
                    return el
                })
            }
            setpData(updatedArray)
        }
        
    }
    const getStates =async():Promise<void>=>{
        try{
            let response = await axios.get(`/api/v1/Orders/statics?year=${year}`)
            if(response.data){
                settotalshares(response.data.totalShareofYear[0])
                setrender(2)
                updateData(cate,response.data.yearState)
                setmonthly(response.data.yearState)
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getStates()
    },[render])
    const xLabels = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sept',
            'Oct',
            'Nov',
            'Dec'
        ];
  return (
    <div>
        <div className='analyze'>
            <div >
                <a><IoAnalyticsOutline size={40}/></a>
                <div>
                <h1>Total Earning</h1>
                <h1>₹{totalshares?.totalSalesbyMoney || 0}</h1>
                </div>
                
            </div>
            <div>
                <a><BsTruck size={40}/></a>
                <div>
                    <h1>Total Orders</h1>
                    <h1>{totalshares?.totalSalesbynumber || 0}</h1>
                </div>
                
            </div>
        </div>
         <div className='w-full mt-6 flex flex-wrap gap-3 max-md:justify-center'>
        <div className='p-2'>
        <div className='sel flex justify-end w-[900px] max-md:w-full'>
            <h1 className='w-full max-md:text-start text-xl font-extrabold'>Statics of {year}</h1>
            <select onClick={(e)=>{setcate(e.target.value),updateData(e.target.value,monthly)}}>
                <option value="Money">Amount</option>
                <option value="orders">Orders</option>
            </select>
            <select value={year} onChange={(e)=>setyear(Number.parseInt(e.target.value))}>
                {
                    years.map((ele,index)=>(
                        <option key={index} value={ele}>{ele}</option>
                    ))
                }
            </select>
        </div>
    <div className='w-[900px] max-md:w-full'>
    <LineChart
      height={600}
      colors={[`rgb(124,171,124)`]}
      series={[
        { data: pData, label: `${lable}` },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
    </div>
    </div>
        <div id='ordertable' className='h-[600px] overflow-scroll'>
            <div className='flex'>
                <h1 className='w-[200px]'>Month</h1>
                <h1 className='w-[200px]'>{lable}</h1>
            </div>
                {
                    xLabels.map((ele,index)=>(
                        <span className='w-[400px] flex'>
                            <h1 className='w-[200px] text-center'>{ele}</h1>
                            <a className='w-[200px] text-center'>{pData[index]}</a>
                        </span>

                    ))
                }
      </div>
    </div>
    </div>
   
    
  )
}

export default ScatterData