import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Torder } from './TypeOrder'
import axios from 'axios'
import { IoArrowBackOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import './Order.scss'
import noimg from  '../../assets/image/7309681.jpg'
import { Getstate} from './States';
import { FaUser } from "react-icons/fa";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { FaBagShopping } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { useSelector } from 'react-redux';
const OrderPage = () => {
    const {id} = useParams<string>()
    const [order,setorder] = useState<Torder>();
    let user = useSelector((state:any)=>state.auth.user)
    const [loader,setloader] = useState<boolean>(false);
    const getOrder =  async():Promise<void>=>{
        try{
            setloader(true)
            let response=await axios.get(`https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/api/v1/Orders/getOrder/${id}`,{withCredentials:true})
            if(response.data){
                setorder(response.data.orders)
                setloader(false)
            }
        }catch(err){
            console.log(err)
            setloader(false)
        }
    }
    const updateOrder =async(data:string):Promise<void>=>{
      try{
          setloader(true)
          let response = await axios.get(`https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/api/v1/orders/statusUpdate/${order?.id}?status=${data}`,{withCredentials:true})
          if(response.data){
            console.log(response.data)
              setloader(false)
              getOrder()
          }
      }catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{getOrder()},[])
  return (
    <main className='max-md:py-12 py-2 px-2'>
        <div className='flex gap- items-center'>
            <button onClick={()=>window.history.back()}><IoArrowBackOutline size={30}/></button>
            <h1 className='font-bold text-center w-full'>OrderID:<span className='ml-2 text-gray-500 italic'>#{order?.id || ""}</span></h1>
        </div>
        <div className='flex w-full flex-col gap-5 items-center'>
            <h1 className='text-xl italic underline mt-4 '>*Order Items*</h1>
            {
                order?.orderItems.map((ele,index)=>(
                    <div key={index} className='orderItem flex w-[1000px] max-sm:w-full items-center justify-between'>
                        <img className='w-[100px] object-contain h-[100px]' src={ele.item.coverphoto} alt="no photo" />
                        <h1>{ele.item.title} X {ele.quantity}</h1>
                        <h1>&#x20b9;{ele.pricetopay}</h1>
                    </div>    
                ))
            }
        </div>
        <div className='flex p-12 max-md:p-2 flex-col items-center'>
            <div className='w-[1000px]'>
            <span className=' w-[200px] flex text-lg items-center px-2 py-2 border gap-2 border-black rounded-md'><FaUser size={25}/>Customer</span>
              <span className='flex items-center p-4 gap-2'>
                <img className='w-[50px] h-[50px] rounded-full' src={order?.user?.photo || noimg}></img>
                <h1 className='text-xl font-bold'>{order?.user?.username}</h1>
              </span>
            </div>
        </div>
        <div className='flex  max-md:p-2 flex-col items-center'>
            <div className='w-[1000px] max-md:w-full'>
            <span className=' w-[200px] flex text-lg items-center px-2 py-2 border gap-2 border-black rounded-md'><FaHome size={25}/>Shipping Address</span>
               <span className='flex gap-2 mt-2'>
                    <a className='font-bold'>Address:</a>
                    <a>{order?.shippingAddress?.line1},{order?.shippingAddress?.line2? `${order?.shippingAddress?.line2}`:""}</a>
               </span>
               <span className='flex gap-2'>
                    <a className='font-bold'>City:</a>
                    <a>{order?.shippingAddress?.city || ""}</a>
               </span>
               <span className='flex gap-2'>
                    <a className='font-bold'>PostalCode:</a>
                    <a>{order?.shippingAddress?.postal_code || ""}</a>
               </span>
               <span className='flex gap-2'>
                    <a className='font-bold'>State:</a>
                    <a>{Getstate(order?.shippingAddress?.state || "")},{order?.shippingAddress?.country || ""}</a>
               </span>
            </div>
           
        </div>
        <div className='flex px-12 max-md:p-2 flex-col items-center'>
            <div className='w-[1000px] max-md:w-full'>
            <span className=' w-[200px] flex text-lg items-center px-2 py-2 border gap-2 border-black rounded-md'><FaBagShopping size={25}/>Order Status</span>
            <div className='w-full mt-4'>
           { order?.status ==="rejected" && <h1 className='text-red-600 text-start'>You will get refund in 1-3 working days</h1>}
            <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.3,
        },
      }}
    >
        {order?.status ==="rejected" &&<TimelineItem>
        <TimelineOppositeContent color="ActiveBorder">
        {new Date(order?.rejectdata).toDateString()}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="error" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent color="red">Order Rejected</TimelineContent>
      </TimelineItem>}
      {order?.status ==="delivered" &&<TimelineItem>
        <TimelineOppositeContent color="ActiveBorder">
        {new Date(order?.deliveryDate).toDateString()}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="success" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent color="green">Order Delivered</TimelineContent>
      </TimelineItem>}
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          {order?.date ? new Date(order.date).toDateString() : 'No date available'}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="secondary" />
        </TimelineSeparator>
        <TimelineContent color="purple">Order Accpeted</TimelineContent>
      </TimelineItem>
    </Timeline> 
            </div>
            </div>
            <div className='w-[1000px] max-md:w-full'>
            <span className=' w-[200px] flex text-lg items-center px-2 py-2 border gap-2 border-black rounded-md'><FaMoneyBillTransfer size={25}/>Billing status</span>
            <span className='flex gap-2 mt-5'>
                    <a className='font-bold'>TotalBill:</a>
                    <a>₹{order?.totalbill || 0}</a>
               </span>
               <span className='flex gap-2'>
                    <a className={`font-bold `}>PaymentStatus:</a>
                    <a className={`${order?.paymentstatus==="success"? "text-green-500 font-extrabold":""}`}>{order?.paymentstatus || 0}</a>
               </span>
               <h1 className='text-gray-400 mt-5 font-extrabold italic'><sup className='text-red-800 text-lg'>*</sup>for additional information contact us on 120-120-120-120</h1>
            </div>
          { user?. role ==="admin" && order?.status==="accept" && <div className='s-btns w-[900px] max-md:w-full'>
              <button onClick={()=>updateOrder("delivered")}>Complete</button>
              <button onClick={()=>updateOrder("rejected")}>Reject</button>
            </div>}
        </div>
        {loader && <div className="loader"></div>}
    </main>
  )
}

export default OrderPage