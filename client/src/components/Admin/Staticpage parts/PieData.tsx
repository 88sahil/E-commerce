import  { useEffect, useState } from 'react'
import { PieChart, pieArcLabelClasses  } from '@mui/x-charts/PieChart';
import axios from 'axios';
const PieData = () => {
    type Tdata = {
        category:string,
        brand:string
        shareByNumber:number,
        shareBymoney:number,
        totalSalesbynumber:number,
        totalSalesbyMoney:number
    }
    let CurrYear = new Date().getFullYear()
    let years =[]
    for(let i=2024;i<=CurrYear;i++){
        years.push(i)
    }
    const [ResData,setResData] = useState<Tdata[]>([])
    const [type,settype] = useState<string>("category")
    const [bytype,setbytype] = useState<string>("Amount")
    const [year,setyear] = useState<number>(CurrYear)
    const deriveData = ():{id: number, value: number, label:string }[]=>{
        let data:{id: number, value: number, label:string }[] =[];
        data = ResData.map((ele,index)=>{
            // let label;
            // if( type="category"){
            //     label = ele.category
            // }else{
            //     label = ele.brand
            // }
            return  {
                id:index,
                value: bytype === "Amount"? ele.totalSalesbyMoney: (bytype === "Order"? ele.totalSalesbynumber:(bytype === "Amount(%)"? ele.shareBymoney:ele.shareByNumber)),
                label:ele.category || ele.brand
            }
        })
        return data;
    }
    const getData = async():Promise<void>=>{
        try{
            let response = await axios.get(`https://mpfserver.vercel.app/api/v1/Orders/propstatics?bytype=${type}&year=${year}`,{withCredentials:true})
            if(response.data){
                setResData(response.data.pie)
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getData();
    },[type,year])
  return (
    <div className='flex gap-8 flex-wrap max-md:justify-center'>
        <div className='w-[900px] max-md:w-full'>
            <div className='p-4 flex flex-wrap'>
                <h1 className='w-full  text-xl max-md:text-sm max-md:font-bold font-extrabold text-start px-2'>Statics by {type} of {year}</h1>
                <select className='p-sel' value={bytype} onChange={(e)=>setbytype(e.target.value)}>
                    <option value="Amount">Amount</option>
                    <option value="Order">Order</option>
                    <option value="Amount(%)">Amount(%)</option>
                    <option value="Order(%)">Order(%)</option>
                </select>
                <select id="" className='p-sel' onChange={(e)=>settype(e.target.value)}>
                    <option value={"category"}>By Category</option>
                    <option value={"brand"}>By Brands</option>
                </select>
                <select value={year} className='p-sel' onChange={(e)=>setyear(Number.parseInt(e.target.value))}>
                    {
                        years.map((ele)=><option value={ele}>{ele}</option>)
                    }
                </select>
            </div>
           <div className='flex flex-wrap'>
            <PieChart
              series={[
        {
          data: deriveData(),
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
    }}
      width={500}
      height={250}
    />
            </div>
        </div>
        <div id='ordertable' className='h-[400px]'>
            <div className='flex sticky'>
                <h1 className='w-[200px]'>{type}</h1>
                <h1 className='w-[200px]'>{bytype}</h1>
            </div>
                {
                    deriveData().map((ele,index)=>(
                        <span className='w-[400px] flex' key={index}>
                            <h1 className='w-[200px] text-center'>{ele.label}</h1>
                            <a className='w-[200px] text-center'>{ele.value}</a>
                        </span>     
                    ))
                }
      </div>
    </div>
  )
}

export default PieData
