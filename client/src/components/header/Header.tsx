import React, { useState } from "react";
import './Header.scss'
import {NavLink} from 'react-router-dom'
import { IoSearchSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaBagShopping } from "react-icons/fa6";
import { RiBarChartHorizontalLine } from "react-icons/ri";
const Header=()=>{
    const [isMenuShow,setisMenuShow] = useState(false);
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
               <button onClick={(e)=>setisMenuShow((prev)=>!prev)}><RiBarChartHorizontalLine/></button>
               {isMenuShow &&<div className="menu">
               <NavLink to={""}>
                    about
                </NavLink>
                <NavLink to={""}>Pricing</NavLink>
                <NavLink to={""}>Blog</NavLink>
                <NavLink to={""}>Jobs</NavLink>
                <NavLink to={""}>Products</NavLink>
               </div>}
            </div>
        </header>
    )
}
export default Header