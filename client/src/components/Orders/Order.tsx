import  { useEffect, useState } from "react";
import {Torder} from './TypeOrder'
import axios from "axios";
import './Order.scss'
import OrderCard from "./OrderCard";
const Order =()=>{
    const [orders,setOrders] = useState<Torder[]>([])
    const [loader,setloader]=useState<boolean>(false)
    const getOrder =async(status:string):Promise<void>=>{
        try{
            setloader(true)
            let response = await axios.get(`api/v1/Orders/myOrders?status=${status}`,{withCredentials:true})
            if(response.data){
                setOrders(response.data.orders)
                setloader(false)
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }
    console.log(orders)
    useEffect(()=>{getOrder("")},[])
    return(
        <div className="p-4">
            <div className="fileter-div gap-2 justify-center flex max-md:py-12">
                    <h1>Filters:</h1>
                    <button onClick={()=>getOrder("")}>All</button>
                    <button className="ml-[10px]" onClick={()=>getOrder("accept")}>pending</button>
                    <button onClick={()=>getOrder("delivered")}>completed</button>
            </div>
                {
                    orders.length>0?(<div>
                        {
                            orders.map((ele)=><OrderCard item={ele}/>)
                        }
                    </div>):(<h1 className="text-center w-full text-xl text-black font-bold">No Order found!</h1>)
                }
           {loader &&<div className="loader"></div>}
        </div>
    )
}
export default Order