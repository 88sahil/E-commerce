import axios from 'axios';
import  { useEffect, useState } from 'react'
import { RiAwardFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
const TopRated = () => {
    type Item ={
        AverageRating:number,
        NoofRating:number,
        id:string,
        title:string,
        coverphoto:string
    }
    const [products,setproducts] = useState<Item[]>([])
    const [limit,setlimit] = useState<number>(10)
    const getItems =async():Promise<void>=>{
        try{
            let respone = await axios.get(`http://13.211.135.249:8000/api/v1/item/getAllitems?AverageRating[gt]=0&sort=-AverageRating,-NoofRating&limit=${limit}&fields=title,coverphoto,AverageRating,NoofRating`,{withCredentials:true})
            if(respone.data){
                setproducts(respone.data.items)
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getItems()
    },[limit])
  return (
    <div className='top p-4'>
    <div className='top-head w-[900px] max-md:w-full items-center flex justify-between'>
    <h1 className='text-start flex items-center text-xl'><RiAwardFill size={25}/>Top Rated Products</h1>
    <div>
    <select value={limit} onChange={(e)=>setlimit(Number.parseInt(e.target.value))}>
        <option value={10}>Top 10</option>
        <option value={20}>Top 20</option>
        <option value={50}>Top 50</option>
    </select>
    </div>

    </div>
    <div className='flex flex-col'>
        <div className='item-c mt-5 flex w-[900px] justify-between max-md:w-full shadow-sm shadow-gray-500'>
            <h1 className='ml-3 text-start font-extrabold'>Photo</h1>
            <h1 className='text-start font-extrabold'>Title</h1>
            <h1 className='mr-3 font-extrabold'>Rating</h1>
        </div>
        {
            products.map((ele)=>(
                <NavLink to={`/product/${ele.id}`} className='item-c items-center w-[900px] p-4 shadow-sm shadow-gray-500 max-md:w-full justify-between flex mt-2'>
                    <img className='w-[80px] object-contain h-[80px]' src={ele.coverphoto}></img>
                    <h1 className='border-none'>{ele.title}</h1>
                    <h1>⭐{ele.AverageRating}({ele.NoofRating})</h1>
                </NavLink>
            ))
        }
    </div>
</div>
  )
}

export default TopRated