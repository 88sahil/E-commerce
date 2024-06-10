import React from 'react'
import './Admin.scss'
import { IoStatsChartOutline } from "react-icons/io5";
import { MdAddToQueue } from "react-icons/md";
import { FaTruck } from "react-icons/fa6";
import { IoMdLaptop } from "react-icons/io";
import { MdOutlineSegment } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { TbBrandAppgallery } from "react-icons/tb";
import { NavLink, Outlet } from 'react-router-dom';
const AdminPanel = () => {
    let Navs:{icon:React.ReactElement,link:string,title:string}[] =[
        {
            icon:<IoStatsChartOutline size={25}/>,
            link:'/admin/static',
            title:'statics'
        },
        {
            icon:<FaTruck size={25}/>,
            link:'/admin/Orders',
            title:'Orders'
        },
        {
            icon:<MdAddToQueue size={25}/>,
            link:'/admin/AddItem',
            title:'AddItem'
        },
        {
            icon:<IoMdLaptop size={25}/>,
            link:'/admin/Items',
            title:'Items'
        },
        {
            icon:<TbBrandAppgallery size={25}/>,
            link:'/admin/brands',
            title:'Brands'
        },
        {
            icon:<BiCategory size={25}/>,
            link:'/admin/Categories',
            title:'Categories'
        }
    ]
    const toggleNav =():void=>{
        let div = document.getElementById("left")
        div?.classList.toggle("left")
        div?.classList.toggle("left-res")
    }
  return (
        <div className='min-h-screen flex max-md:py-12 py-0'>
            <button id='menubtn' onClick={()=>toggleNav()}><MdOutlineSegment/></button>
             <aside className='left w-[300px]' id='left'>
                <button onClick={()=>toggleNav()}>Close</button>
                {
                    Navs.map((ele)=>(
                        <NavLink  to={ele.link} className={`navs w-full flex justify-center items-center`}>
                            <a className='flex items-center justify-center gap-1'>{ele.icon}{ele.title}</a>
                        </NavLink>
                    ))
                }
            </aside>   
            <main className='w-full'>
                <Outlet />
            </main>
        </div>
  )
}

export default AdminPanel