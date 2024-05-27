import React, { useState } from "react";
import './Header.scss'
import {NavLink, useNavigate} from 'react-router-dom'
import { IoSearchSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaBagShopping } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { BsCartCheckFill } from "react-icons/bs";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {logout} from '../../store/AuthSlice'
const Header=()=>{
    let erro_image = useSelector(state=>state.auth.defaultImage)
    let user = useSelector((state)=>state.auth.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isMenuShow,setisMenuShow] = useState(false);
    const [isUserShow,setisUserShow] = useState(false);
    const handleLogout =async()=>{
            try{
                let res =await axios.get("http://localhost:8000/logout",{withCredentials:true})
                console.log(res)
                if(res.data){
                    dispatch(logout())
                    navigate('/')
                }
            }catch(err){
                alert("fail to logout");
            }
    }
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
               <NavLink to={""}><CiHeart/></NavLink>
               <NavLink to={""}><FaBagShopping/></NavLink>
               <button onClick={(e)=>{setisUserShow((prev)=>!prev);setisMenuShow(false)}}>{user?  (<img src={user?.photo || erro_image} className="w-[30px] h-[30px] rounded-full object-center" alt="user" title={user.username}/>):(<FaUserAlt/>)}</button>
               <button id="MenuShow" onClick={(e)=>{setisMenuShow((prev)=>!prev);setisUserShow(false)}}><RiBarChartHorizontalLine/></button>
               {isMenuShow &&<div className="menu">
               <NavLink to={""}>
                    about
                </NavLink>
                <NavLink to={""}>Pricing</NavLink>
                <NavLink to={""}>Blog</NavLink>
                <NavLink to={""}>Jobs</NavLink>
                <NavLink to={""}>Products</NavLink>
               </div>}
               {isUserShow && <div className="usermenu right-0 top-[80px] bg-gray-100">
                    <div className="">
                        {
                            user? (
                               <div className="userdetail p-5 flex flex-col items-center">
                                 <img src={user.photo || erro_image} className="w-[120px] h-[120px] rounded-full" alt="usernmae"></img>
                                <p className="text-xl font-bold font-serif">{user.username || ' '}</p>
                               </div>
                            ):(<button onClick={()=>navigate('/Login')}>Login</button>)
                        }
                    </div>
                    <div>
                        <NavLink className="flex w-full justify-center items-center gap-2 py-2 border-b border-black-500"><IoSettingsOutline/>Settings</NavLink>
                        <NavLink className="flex w-full justify-center items-center gap-2 py-2 border-b border-black-500    "><BsCartCheckFill/>My Orders</NavLink>
                        <div className="w-full flex justify-center items-center p-5">
                            <button onClick={()=>handleLogout()} className="border-red-500 border text-red-500 px-5 py-1">Logout</button>
                        </div>
                    </div>
               </div>}
            </div>
        </header>
    )
}
export default Header