import React from "react";
import { FaTruck } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdSecurityUpdateGood } from "react-icons/md";
import './Features.scss'
const Features=()=>{
    return(
        <>
         <h1 className="text-2xl font-extrabold mt-12">Why You should choose us?</h1>
        <div className="features">

            <div>
                <FaTruck size={80} className="icons"/>
                <a>Fast Delivery</a>
            </div>
            <div>
                <RiCustomerService2Line size={80} className="icons"/>
                <a>24X7 customer support</a>
            </div>
            <div>
                <MdSecurityUpdateGood size={80} className="icons"/>
                <a>MoneyBack Guaranty</a>
            </div>
        </div></>
       
    )
}
export default Features