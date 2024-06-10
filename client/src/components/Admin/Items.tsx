import React, { useEffect, useState } from 'react'
import { FaPen } from "react-icons/fa";
import './Staticpage parts/style.scss'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
const Items = () => {
     type brand = {
        _id:string,
        brandname:string
    }
    type categories = {
        _id:string,
        value:string
    }
    type item={
        category:{
            value:string
        },
        coverphoto:string,
        discount:number,
        id:string,
        manufacturour:{
            brandname:string,
            logo:string,
        },
        price:number,
        title:string,
        _id:string
    }
    const [loader,setloader] = useState<boolean>(false)
    const [item,setitem] =useState<item[]>([])
    const [page,setpage] = useState(0)
    const [totalproducts,settotalproducts] = useState<number>(0)
    const getProducts = async():Promise<void>=>{
        let query = `/api/v1/item/getAllitems?page=${page}&limit=10&sort="-publishedAt"&fields=_id,price,title,coverphoto,discount`
        try{
            setloader(true)
            let response = await axios.get(query,{withCredentials:true})
            if(response.data){
                setloader(false)
                settotalproducts(response.data.totalitems)
                setitem(response.data.items)
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }
    useEffect(()=>{
        getProducts()
    },[page])
  return (
    <main className='flex flex-col items-center'>
         <div className='w-[900px] max-md:w-full p-2'>
            <div className='flex justify-between p-2 items-center'>
                <h1 className='text-xl'>Total Results {totalproducts}</h1>
            </div>
            <div className=''>
                {
                    item.map((ele)=>(
                        <div className='flex w-full items-center justify-between shadow-md shadow-gray-200 p-5'>
                             <NavLink to={`/admin/EditItem/${ele.id}`} className="flex items-center w-full justify-between">
                            <img className='w-[80px] object-contain h-[80px]' src={ele.coverphoto} alt="" />
                            <h1 className=' max-md:text-sm'>{ele.title}</h1>
                            <h1 className='max-md:hidden'>₹{ele.price}</h1>
                            <button><FaPen color='blue'/></button>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
            <div className="mt-2 w-full justify-center p-2">
                        <Pagination onChange={(e,page)=>setpage(page)}  count={totalproducts/10>1? (totalproducts/2):(1)}/>
            </div>
        </div>
       {loader && <div className="loader"></div>}
    </main>
  )
}

export default Items