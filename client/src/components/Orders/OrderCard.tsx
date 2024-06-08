import React from "react";
import { Torder } from "./TypeOrder";
import './Order.scss'
import { NavLink } from "react-router-dom";
const OrderCard =(props:{item:Torder})=>{
    let quantity =0;
    for(let ele of props.item.orderItems){
        quantity += ele.quantity
    }
    return(
        <NavLink to={`/order/${props.item.id}`} className="ordercard flex relative max-sm:text-sm">
            <img src={props.item.orderItems[0].item.coverphoto} alt="item"></img>
            <div>
                <h1>{`#${props.item.id}`}</h1>
                <h1>items x {quantity}</h1>
                <h1 className="max-md:block hidden"> {`${new Date(props.item.date).toDateString()}`}</h1>
            </div>
            <h1>&#x20b9;{props.item.totalbill}</h1>
            <h1 className={`py-1.5 h-[35px] max-sm:hidden px-3 ${props.item.status==='accept'?"bg-gray-300":`${props.item.status==='rejected'? "bg-red-500 text-white":"bg-green-500 text-white"}`}`}>{props.item.status}</h1>
           <h1 className="max-md:hidden"> {`${new Date(props.item.date).toDateString()}`}</h1>
           <h1 className="absolute right-0 top-0 bg-green-400 max-md:top-[-32px] text-white p-1">Payment:{props.item.paymentstatus}</h1>
        </NavLink>
    )
}
export default OrderCard