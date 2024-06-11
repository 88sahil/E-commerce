import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import './Admin.scss'
import { useSelector } from 'react-redux'
import noimg from '../../assets/image/image.png'
import { MdDelete } from "react-icons/md"
import { useNavigate, useParams } from 'react-router-dom'
type item={
    _id:string,
    title:string,
    publishedAt:Date,
    price:number,
    discount:number,
    coverphoto:string,
    coverphotoId:string,
    isAvailable:boolean,
    description:string,
    category:category,
    manufacturour:brand,
    AverageRating:number,
    NoofRating:number,
    photos:photo[] | []
    reviews:review[] |[]
    staticOfReview: staticsOfreview[] | []
}
type staticsOfreview={
    Rate:number,
    numberofRates:number
}
type photo = {
    id:string,
    photo:string,
    photoId:string
}
type brand={
    brandname:string,
    logo:string,
    _id:string
}
type category={
    value:string,
    id:string
}
type review ={
    createdAt:Date,
    id:string,
    message:string,
    product:string,
    rating:number,
    user:{
        id:string,
        photo:string,
        username:string
    }
}
const EditItem = () => {
    const defaultimg = useSelector((state:any)=>state.auth.defaultImage)
    const {id} = useParams()
    const [render,setrender] = useState(1)
    const [category,setcategory] = useState<any[]>([])
    const [photos,setphotos] = useState<any[] | null | undefined>([])
    const [brands,setbrands] = useState<any[]>([])
  const [item,setitem] = useState<item>()
  const [photo,setphoto] = useState<any | null | undefined>()
  const {reset,handleSubmit,register} = useForm({
    defaultValues:{
        title:item?.title || "",
        price:item?.price || 0,
        discount:item?.discount || 0,
        description:item?.description || "",
        manufacturour:item?.manufacturour?._id || "",
        category:item?.category?.id || "",
        isAvailable:item?.isAvailable || ""
    }
})
  const [loader,setloader] = useState<boolean>(false)
  let findCategoryAndbrand =async():Promise<void>=>{
    try{
        let category = await axios.get(`http://13.211.135.249:8000/api/v1/category`)
        if(category.data){
            setcategory(category.data.categories)
        }
        let brands = await axios.get('http://13.211.135.249:8000/api/v1/brands/getAllbrands')
        if(brands.data){
            setbrands(brands.data.brands)
        }
    }catch(err){
        console.log(err)
    }
}
const updateData =async(data:FieldValues):Promise<void>=>{
    try{
        setloader(true)
        let resposne = await axios.patch(`http://13.211.135.249:8000/api/v1/item/update/${item?._id}`,data,{withCredentials:true});
        if(resposne.data){
            setitem(resposne.data.item)
            setloader(false)
        }
    }catch(err){
        setloader(false)
        console.log(err)
    }
}
const deletephoto =async(id:string):Promise<void>=>{
    try{
        setloader(true)
        let response = await axios.get(`http://13.211.135.249:8000/api/v1/item/removephoto/${item?._id}?photoid=${id}`,{withCredentials:true})
        if(response.data){
            setloader(false)
            setitem(response.data.item)
        }

    }catch(err){
        setloader(false)
        console.log(err)
    }
}
const updateCoverphoto =async():Promise<void>=>{
    if(photo){
        try{
            setloader(true)
            let response = await axios.patch(`http://13.211.135.249:8000/api/v1/item/updateCoverphoto/${item?._id}`,{profile:photo},{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}})
            if(response.data){
                setitem(response.data.item)
                setphoto(null);
                setloader(false)
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }else{
        alert("please choose photo first")
    }
}
const updatephotos =async():Promise<void>=>{
    if((photos? photos.length:0)>0){
        const formData = new FormData()
        if(photos){
            console.log(photos)
            for(let ele of photos){
                console.log(ele)
                formData.append('photos',ele)
            }
        }
        try{
            setloader(true)
            let response = await axios.patch(`http://13.211.135.249:8000/api/v1/item/uploadphoto/${item?._id}`,formData,{withCredentials:true,headers:{
                 'Content-Type': 'multipart/form-data',
            }})
            if(response.data){
                console.log(response.data)
                setitem(response.data.item)
                setphotos(null);
                setloader(false)
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }else{
        alert("please choose photo first")
    }
}
  const getItem =async():Promise<void>=>{
    try{
        setloader(true);
        let response = await axios.get(`http://13.211.135.249:8000/api/v1/item/getItem/${id}`,{withCredentials:true})
        if(response.data.item){
            setitem(response.data.item)
            setloader(false)
            setrender(2)
        }
    }catch(err){
        alert("error")
        const navigate = useNavigate()
        navigate('/');
    }
}
const uploadImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if((e.target?.files? e.target.files.length:0)>0){
        let arr:any = (e.target?.files? (e.target.files):[])
        setphotos(arr)
    }
}

useEffect(()=>{
    findCategoryAndbrand()
    getItem()
        reset({
                title:item?.title || "",
                price:item?.price || 0,
                discount:item?.discount || 0,
                description:item?.description || "",
                manufacturour:item?.manufacturour?._id || "",
                category:item?.category?.id || "",
                isAvailable:item?.isAvailable || "",
        })
},[render])
  return (
        <div className='edit flex  flex-col  items-center'>    
        <form className='add-form shadow-none' onSubmit={handleSubmit(updateData)}>
        <h1 className='text-gray-500 text-xl font-bolder'>Edit {item?.title || ""}</h1>
            <span>
                <label htmlFor='title'>
                    Title
                </label>
                <input type="text"  {...register("title",{required:true})} placeholder='Enter Product name' />
            </span>
            <span>
                <label htmlFor='price'>
                    price
                </label>
                <input type="number"  inputMode="numeric" {...register("price",{required:true})} placeholder='Enter Product price' />
            </span>
            <span>
                <label htmlFor='discount'>
                    Discoint
                </label>
                <input type="number"  inputMode="numeric" {...register("discount",{required:true})} placeholder='Enter Product price' />
            </span>
            <span>
                <label>
                    Description
                </label>
                <textarea rows={10} {...register("description",{required:true})} placeholder='description' />
            </span>
            <span>
                <label htmlFor='isAvaliable'>
                    isAvailable
                </label>
                <select  {...register("isAvailable",{required:true})}>
                    <option value={"true"}>True</option>
                    <option value={"false"}>False</option>
                </select>
            </span>
            <span>
                <label htmlFor='category'>
                    category
                </label>
                <select  {...register("category",{required:true})}>
                    {
                        category?.map((ele)=>(
                            <option value={ele.id}>{ele.value}</option>
                        ))
                    }
                </select>
            </span>
            <span>
                <label htmlFor='manufacturour'>
                    Brand
                </label>
                <select  {...register("manufacturour",{required:true})}>
                    {
                        brands?.map((ele)=>(
                            <option value={ele._id}>{ele.brandname}</option>
                        ))
                    }
                </select>
            </span>
            <button>Update</button>
        </form>
        <div>
            <h1 className='text-gray-500 text-xl font-bolder'>ChangeCoverphoto</h1>
            <div className='w-[500px]  h-[400px] rounded-md max-md:w-[400px]'>
                    <img className="w-[400px] rounded-md h-[350px] object-contain max-md:w-[400px]" src={photo?  (URL.createObjectURL(photo)):(item?.coverphoto? (item.coverphoto):(defaultimg))}/>
                    <input type="file" accept='image/*' onChange={(e)=>setphoto(e.target.files? e.target.files[0]:null)} required/>
                    <button className='btn' onClick={()=>updateCoverphoto()}>changephoto</button>
            </div>
        </div>
        <div className='w-[600px] max-md:w-full mt-12'>
            <h1 className='p-4 text-xl text-gray-500 font-extrabold'>Add Photos</h1>
        <div className=' w-full  gap-2 mt-15'>
            <div className='flex flex-wrap gap-5'>
            {
                    (item?.photos ? item?.photos.length:0)>0? (
                        item?.photos.map((ele)=>(
                            <div className='photos border border-black p-1'>
                                <img className='w-[250px] object-contain h-[200px]' src={ele.photo}></img>
                                <button onClick={()=>deletephoto(ele.id)}><MdDelete size={25} color='red'/></button>
                            </div>
                        ))
                    ):(
                        <img src={noimg} alt="" />
                    )
                }
            </div>
               <div className=' p-2'>
               <input type="file" onChange={(e)=>uploadImage(e)} accept='image/*' multiple/>
                <button className='btn' onClick={()=>updatephotos()}>save</button>
               </div>
              
            </div>
        </div>
        {loader && <div className="loader"></div>}
        </div>
        
    )
}

export default EditItem