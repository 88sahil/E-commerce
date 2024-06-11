import  { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Success =()=>{
    const [orderf,setorderf] = useState<boolean>(false)
    const [count,setcount] = useState<number>()
    const {id} = useParams<string>();
    const navigate = useNavigate()
    const startTimer = (num:number) => {
          let Interval = setInterval(()=>{
                setcount(num)
                num--;
                if(num<0){
                    clearInterval(Interval)
                    navigate(`/order/${id}`)
                }
            },1000)
      };
    
    const checkPayment = async():Promise<void>=>{
        try{
            let response = await axios.get(`/api/v1/Orders/getOrder/${id}`,{withCredentials:true})
            if(response.data){
                if(response.data.orders.paymentstatus==="success"){
                    setorderf(true)
                    startTimer(7)
                }
            }
        }catch(err){
            console.log(err)
            alert("please reorder")
        }
    }
    useEffect(()=>{
        checkPayment()
    },[])
    return(
        <div className="min-h-screen">
            {
                orderf? (<div className=" absolute left-1/2 flex flex-col items-center top-[40%] max-md:left-[35%]">
                <div className="loading ">
                 <svg xmlns="http://www.w3.org/2000/svg" width="124" height="124" viewBox="0 0 124 124">
                 <circle className="circle-loading" cx="62" cy="62" r="59" fill="none" stroke="hsl(116, 76%, 87%)" stroke-width="6px"></circle>
                <circle className="circle" cx="62" cy="62" r="59" fill="none" stroke="hsl(155, 67%, 45%)" stroke-width="6px" stroke-linecap="round"></circle>
                <polyline className="check" points="73.56 48.63 57.88 72.69 49.38 62" fill="none" stroke="hsl(155, 67%, 45%)" stroke-width="6px" stroke-linecap="round"></polyline>
                </svg>
                </div>
                    <h1 className="duration-500 text-xl font-extrabold">Order Accepted</h1>
                    <h1>redirect to order in {count || 7}s</h1>
                </div>):(<Loader text="checking payment"/>)
            }
            
        </div>
    )
}
export default Success