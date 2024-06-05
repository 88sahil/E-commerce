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
    let isActive = useSelector(state=>state.auth.Active);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isMenuShow,setisMenuShow] = useState(false);
    const [isUserShow,setisUserShow] = useState(false);
    const [searchItem,setsearchItem] = useState([])
    const [showsblock,setshowsblock] = useState<boolean>(false)
    const iphandlesearch =(Event:React.ChangeEvent)=>{
            Event.preventDefault()
            if(Event.target.value.length>0){
                setshowsblock(true)
            }else{
                setshowsblock(false)
            }
        setTimeout(async()=>{
            try{
                let searchitem = await axios.get(`/api/v1/item/getListing?title=${Event.target.value}`)
                if(searchitem.data){
                    setsearchItem(searchitem.data.items);
                }
            }catch(err){
                console.log(err)
            }
        },100)
    }
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
                <NavLink to={"/"}>MPF.</NavLink>
                <nav>
                <NavLink to={""}>
                    about
                </NavLink>
                <NavLink to={""}>Pricing</NavLink>
                <NavLink to={""}>Blog</NavLink>
                <NavLink to={""}>Jobs</NavLink>
                <NavLink to={"/AllProducts"}>Products</NavLink>
                <NavLink to={""}>More</NavLink>
            </nav>
            </div>
            
            <div className="flex items-center gap-5 mr-[50px]">
               {showsblock && <div className="searchitems">
                    {
                        searchItem.length>0?(
                            <div className="p-5 overflow-scroll">
                                 {
                                searchItem.map((ele,index)=>
                                        <NavLink to={`/product/${ele._id}`} key={index} className="flex items-center justify-between mt-4 border-b p-2 border-black">
                                            <img src={ele.coverphoto} className="w-[100px] h-[100px]"></img>
                                            <a>{ele.title}</a>
                                            <a>&#x20b9;{ele.price-ele.discount}</a>
                                        </NavLink>
                                )
                                }
                            </div>   
                        ):(<h1>no items found</h1>)
                    }
                    <button onClick={()=>setshowsblock(false)}>close</button>
                </div>}
                <form onSubmit={iphandlesearch}>  
                        <input className="ip" placeholder="Search Items🔍" type="text" onChange={iphandlesearch}></input>
                </form>
               <NavLink to={"/likes"}><CiHeart/></NavLink>
               <NavLink to={"/cart"}><FaBagShopping/></NavLink>
               <button onClick={(e)=>{setisUserShow((prev)=>!prev);setisMenuShow(false)}}>{user?  (<img src={user?.photo || erro_image} className="w-[30px] h-[30px] rounded-full object-center" alt="user" title={user.username}/>):(<FaUserAlt/>)}</button>
               <button id="MenuShow" onClick={(e)=>{setisMenuShow((prev)=>!prev);setisUserShow(false)}}><RiBarChartHorizontalLine/></button>
               {isMenuShow &&<div className="menu">
               <NavLink to={""}>
                    <p className="w-full text-center">about</p>
                </NavLink>
                <NavLink to={""} ><p className="w-full text-center">Pricing</p></NavLink>
                <NavLink to={""}><p className="w-full text-center">Blog</p></NavLink>
                <NavLink to={""} ><p className="w-full text-center">Jobs</p></NavLink>
                <NavLink to={"/AllProducts"}><p className="w-full text-center">Products</p></NavLink>
               </div>}
               {isUserShow && <div className="usermenu right-0 top-[80px] bg-gray-100">
                    <div className="">
                        {
                            user? (
                               <div className="userdetail p-5 flex flex-col items-center">
                                 <img src={user.photo || erro_image} className="w-[120px] h-[120px] rounded-full" alt="usernmae"></img>
                                <p className="text-xl font-bold font-serif">{user.username || ' '}</p>
                               </div>
                            ):(<div className="flex p-5 item-center justify-center"><button onClick={()=>navigate('/Login')} className="loginBtn">Login</button></div>)
                        }
                    </div>
                    <div>
                        <NavLink className="flex w-full justify-center items-center gap-2 py-2 border-b border-black-500" to={"/setting/account"}><IoSettingsOutline/>Settings</NavLink>
                        <NavLink className="flex w-full justify-center items-center gap-2 py-2 border-b border-black-500    "><BsCartCheckFill/>My Orders</NavLink>
                        <div className="w-full flex justify-center items-center p-5">
                           {isActive && <button onClick={()=>handleLogout()} className="border-red-500 border text-red-500 px-5 py-1">Logout</button>}
                        </div>
                    </div>
               </div>}
            </div>
        </header>
    )
}
export default Header