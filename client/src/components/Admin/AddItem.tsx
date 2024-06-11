import axios from 'axios'
import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import './Admin.scss'
import { useNavigate } from 'react-router-dom'
const AddItem = () => {
    const [category,setcategory] = useState<any[]>([])
    const [brands,setbrands] = useState<any[]>([])
    const {register,handleSubmit} = useForm()
    const [photo,setphoto]= useState<any | null | undefined>()
    const [loader,setloader] = useState(false)
    let findCategoryAndbrand =async():Promise<void>=>{
        try{
            let category = await axios.get(`https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/api/v1/category`)
            if(category.data){
                setcategory(category.data.categories)
            }
            let brands = await axios.get('https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/api/v1/brands/getAllbrands')
            if(brands.data){
                setbrands(brands.data.brands)
            }
        }catch(err){
            console.log(err)
        }
    }
    const uploadPhoto = async():Promise<{url:string,id:string} | null | undefined>=>{
        if(photo){
            try{
                let response = await axios.post('https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/api/v1/item/uploadCoverphoto',{profile:photo},{
                    withCredentials:true,
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                })
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
    const navigate = useNavigate()
    const addItem = async(data:FieldValues):Promise<void>=>{
        console.log(data)
            setloader(true)
            let photodata = await uploadPhoto();
            try{
                if(photodata){
                    data.coverphoto = photodata.url,
                    data.coverphotoId = photodata.id
                    try{
                        let response = await axios.post(`https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/api/v1/item/`,data,{withCredentials:true})
                        if(response.data){
                            setloader(false)
                            navigate(`/product/${response.data.item.id}`)
                        }
                    }catch(err){
                        setloader(false)
                        console.log(err)
                    }
                }
            }catch(err){
                setloader(false)
                console.log(err)
            }
           
           

    }
    useEffect(()=>{
        findCategoryAndbrand()
    },[])
  return (
    <main className='w-full flex max-md:justify-start justify-center'>
        <form className='add-form' onSubmit={handleSubmit(addItem)}>
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
                <label>
                    Description
                </label>
                <textarea rows={10} {...register("description",{required:true})} placeholder='description' />
            </span>
            <div>
                {
                    photo? (<img src={URL.createObjectURL(photo)}></img>):(
                        <h1>Add photo</h1>
                    )
                }
            </div>
            <span>
                <label htmlFor='photo'>
                    coverphoto
                </label>
                <input type="file" onChange={(e)=>setphoto(e.target.files? (e.target.files[0]):null)} name='photo' accept='image/*'  required/>
            </span>
            <span>
                <label htmlFor='category'>
                    category
                </label>
                <select  {...register("category",{required:true})}>
                    {
                        category.map((ele)=>(
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
                    <option value="">none</option>
                    {
                        brands.map((ele)=>(
                            <option value={ele._id}>{ele.brandname}</option>
                        ))
                    }
                </select>
            </span>
            <button>Upload</button>
        </form>
      {loader && <div className="loader"></div>}
    </main>
  )
}

export default AddItem