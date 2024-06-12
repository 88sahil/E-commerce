import axios from 'axios'
import  { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { MdDeleteForever } from "react-icons/md";
const Brands = () => {
    type Brands={
        _id:string,
        brandname:string,
        foundBy:string,
        description:string,
        logo:string,
        logoId:string,
    }
    const [loader,setloader] = useState<boolean>(false)
    const {register,handleSubmit} = useForm()
    const [brands,setbrands] = useState<Brands[]>([])
    const [photo,setphoto] = useState<any | null | undefined>();
    const UploadLogo =async():Promise<{url:string,id:string} | null | undefined>=>{
        if(photo){
            try{
                let response = await axios.post(`/api/v1/brands/uploadphoto`,{profile:photo},{withCredentials:true,headers:{
                    "Content-Type":'multipart/form-data'
                }})
                if(response.data){
                    return {
                        url:response.data.url,
                        id:response.data.id
                    }
                }
            }catch(err){
                console.log(err)
            }
        }
    }
    const getBrands = async():Promise<void>=>{
                setloader(true)
                try{
                let response = await axios.get(`/api/v1/brands/getAllbrands`,{withCredentials:true})
            if(response.data){
                setloader(false)
                setbrands(response.data.brands)
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }  
        
    }
    const deleteBrand = async(id:string):Promise<void>=>{
        try{
            setloader(true)
            let response = await axios.delete(`/api/v1/brands/deletebrand/${id}`,{withCredentials:true})
            if(response.data){
                setloader(false)
                alert(response.data.message)
                getBrands()
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }
    const AddBrand =async(data:FieldValues):Promise<void>=>{
        if(photo){
            setloader(true)
            let uphoto = await UploadLogo()
            data.logo = uphoto?.url
            data.logoId = uphoto?.id
            try{
                let response = await axios.post(`/api/v1/brands/AddBrand`,data,{withCredentials:true})
                if(response.data){
                    setloader(false)
                    setbrands([response.data.brand,...brands])
                }
            }catch(err){
                setloader(false)
                console.log(err)
            }
        }else{
            alert("please choose photo")
        }
       
    }
    useEffect(()=>{getBrands()},[])
  return (
    <div className='flex p-4 flex-wrap gap-2'>
        <form className='add-form' onSubmit={handleSubmit(AddBrand)}>
            <h1 className='text-xl font-bold'>AddBrand</h1>
            <span>
                <label>
                    Brandname
                </label>
                <input type="text"  {...register("brandname",{required:true})} placeholder='Enter brand name' />
            </span>
            <span>
                <label>
                    FoundBy
                </label>
                <input type="text"  {...register("foundBy",{required:true})} placeholder='Enter Founder name' />
            </span>
            <span>
                <label >
                    Description
                </label>
                <textarea {...register("description",{required:true})} rows={10} placeholder='Enter description' />
            </span>
            <div className='w-[500px]  h-[400px] rounded-md max-md:h-[300px] max-md:w-[400px]'>
                {
                    photo? (<img className='w-[400px] rounded-md h-[350px] object-contain max-md:h-[300px] max-md:w-[400px]' src={URL.createObjectURL(photo)}></img>):(
                        <h1>Add Logo</h1>
                    )
                }
            </div>
            <span>
                <label>
                    Logo
                </label>
                <input type="file" onChange={(e)=>setphoto(e.target.files? e.target.files[0]:null)} accept='image/*'  />
            </span>
            <button>Add Brand</button>
        </form>
        <div className='p-3 w-[600px] max-md:w-full'>
            <h1 className='text-center text-xl font-bold w-full'>Brands</h1>
            <div>
                <div className='flex justify-between shadow-sm p-2 '>
                <h1 className='font-bold'>Logo</h1>
                <h1 className='font-bold'>Brandname</h1>
                <h1 className='font-bold'>Founder</h1>
                <h1 className='font-bold'>delete</h1>
                </div>
                
                {
                    brands.map((ele)=>(
                        <span className='flex shodow-gray-100 shadow-md p-2 items-center justify-between mt-2'>
                            <img className='w-[50px] rounded-xl h-[50px]' src={ele.logo} alt="" />
                            <h1>{ele.brandname}</h1>
                            <h1>{ele.foundBy}</h1>
                            <button onClick={()=>deleteBrand(ele._id)}><MdDeleteForever size={20} color='red'/></button>
                        </span>
                    ))
                }
            </div>
        </div>
       {loader && <div className="loader"></div>}
    </div>
  )
}

export default Brands