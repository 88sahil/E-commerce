import axios from 'axios'
import  { useEffect, useState } from 'react'
import './Staticpage parts/style.scss'
import { NavLink } from 'react-router-dom'
import noimg from '../../assets/image/7309681.jpg'
import { FaEye } from "react-icons/fa";
const AdminOrder = () => { 
    type  Torder={
        id:string,
        paymentsessionId:string,
        date:Date,
        paymentstatus:string,
        shippingAddress:{
            
                city: string,
                country:string,
                line1: string,
                line2: string,
                postal_code: string,
                state:string
        },
        status:string,
        totalbill:number,
        user:{
                username:string,
                email: string,
                photo:string,
                id: string
        }
    }
    const [results,setresults] = useState<number>(0)
    const [status,setstatus] = useState("accept")
    const [orders,setorders] = useState<Torder[]>([])
    let GetOrders=async():Promise<void>=>{
        try{
            let response = await axios.get(`https://mpfserver.vercel.app/api/v1/Orders/getAllOrder?type=${status}`,{withCredentials:true})
            if(response.data){
                setorders(response.data.orders);
                setresults(response.data.results);
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{GetOrders()},[status])
  return (
    <main className='w-full flex max-md:justify-start justify-center'>
        <div className='w-[900px] max-md:w-full p-2'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl max-md:text-[16px] font-bold'>OrderStatus:<span className={`${status==="delivered"? "text-green-600":(status==="rejected"? "text-red-600":"text-blue-700")}`}>{status || "All"}</span></h1>
                <h1 className='text-xl max-md:text-[16px] font-bold'>Results:{results}</h1>
                <select name="status" id="" className='p-sel' value={status} onChange={(e)=>setstatus(e.target.value)}>
                    <option value="">All</option>
                    <option value="accept">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="delivered">delivered</option>
                </select>
            </div>
            <div>
                {
                    orders.map((ele)=>(
                        <div className='flex w-full items-center justify-between shadow-md shadow-gray-200 p-5'>
                             <NavLink to={`/order/${ele.id}`} className="flex items-center w-full justify-between" title={`${new Date(ele.date).toDateString()}`}>
                            <h1 className=' max-md:text-sm'>#{ele.id}</h1>
                            <span className='flex items-center gap-1'>
                                <img className='w-[50px] h-[50px] rounded-full max-md:w-[30px] max-md:h-[30px]' src={ele?.user?.photo || noimg } alt="" />
                                <h1 className="max-md:hidden">{ele.user?.username}</h1>
                            </span>
                            <h1 className='max-md:hidden'>₹{ele.totalbill}</h1>
                            <button><FaEye/></button>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
        </div>
    </main>
  )
}

export default AdminOrder
