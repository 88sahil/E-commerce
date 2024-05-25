import React, { useState } from "react";
import axios from "axios";
const Payment =()=>{
    const sendItem = async()=>{
        try{
            console.log("hii")
            let res = await axios.post("http://localhost:8000/checkout",{item},{withCredentials:true});
            window.open(res.data.session.url);
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div>
           Payments
        </div>
    )
}
export default Payment