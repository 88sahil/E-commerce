import React, { useState } from "react";
import './Header.scss'
import {NavLink} from 'react-router-dom'
import { IoSearchSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaBagShopping } from "react-icons/fa6";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { useSelector } from "react-redux";
const Header=()=>{
    let user = useSelector(state=>state.)
    const [isMenuShow,setisMenuShow] = useState(false);
    const [isUserShow,setisUserShow] = useState(true)
    return(
        <header className="w-full h-[80px]">
            {/* logo */}
            <div className="logo">
                <a>MPF.</a>
                <nav>
                <NavLink to={""}>
                    about
                </NavLink>
                <NavLink to={""}>Pricing</NavLink>
                <NavLink to={""}>Blog</NavLink>
                <NavLink to={""}>Jobs</NavLink>
                <NavLink to={""}>Products</NavLink>
                <NavLink to={""}>More</NavLink>
            </nav>
            </div>
            
            <div className="flex items-center gap-5 mr-[50px]">
               <button id="Search"><IoSearchSharp/></button>
               <NavLink to={""}><FaUserAlt/></NavLink>
               <NavLink to={""}><CiHeart/></NavLink>
               <NavLink to={""}><FaBagShopping/></NavLink>
               <button id="MenuShow" onClick={(e)=>setisMenuShow((prev)=>!prev)}><RiBarChartHorizontalLine/></button>
               {isMenuShow &&<div className="menu">
               <NavLink to={""}>
                    about
                </NavLink>
                <NavLink to={""}>Pricing</NavLink>
                <NavLink to={""}>Blog</NavLink>
                <NavLink to={""}>Jobs</NavLink>
                <NavLink to={""}>Products</NavLink>
               </div>}
               <div className="usermenu">
                    <div></div>
               </div>
            </div>
        </header>
    )
}
export default Header