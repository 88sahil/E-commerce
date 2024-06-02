import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import './Setting.scss'
import { MdOutlineCancel } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
const SettingPage=()=>{
    const [toggle,settoggle] = useState<Boolean>(true);
    let divs:HTMLBodyElement;
    const handleNav=()=>{
        divs= document.getElementById("Setting_nav")
        let btn:HTMLBodyElement = document.getElementById("Menu")
        btn.classList.toggle("menu-active")
        divs.classList.toggle("Setting-res")
        settoggle(prev=>!prev)
    }
    return(
       <div className="flex">
        <div className="buttondiv min-h-screen w-[50px]">
        <button id="Menu" className="absolute z-10" onClick={()=>{handleNav()}}>{toggle? (<CiMenuFries fontSize={25}/>):(<MdOutlineCancel fontSize={25}/>)}</button>
        </div>
        
         <div className="Setting-navs" id="Setting_nav">
            <NavLink to={"/setting/account"}>Account</NavLink>
            <NavLink to={"/setting/Privacy"}>Privacy</NavLink>
        </div>
        <div className="w-full">
            <Outlet/>
        </div>
       </div>
    )
}
export default SettingPage