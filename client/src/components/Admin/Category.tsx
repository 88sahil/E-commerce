import axios from 'axios'
import { useEffect, useState } from 'react'
import './Admin.scss'
import { FieldValues, useForm } from 'react-hook-form'
const Category = () => {
    const [category,setcategory]=useState<{value:string,id:string}[]>([])
    const [loader,setloader]= useState<boolean>(false)
    const {register,handleSubmit} = useForm()
    const getCategory =async():Promise<void>=>{
        try{
            setloader(true)
            let response = await axios.get(`https://mpfserver.vercel.app/api/v1/category`);
            if(response.data){
                setcategory(response.data.categories)
                setloader(false)
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }
    const addCategory =async(data:FieldValues):Promise<void>=>{
        try{
            setloader(true)
            let response = await axios.post(`https://mpfserver.vercel.app/api/v1/category`,data,{withCredentials:true})
            if(response.data){
                setloader(false)
                setcategory([...category,response.data.categ])
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{getCategory()},[])
  return (
    <div>
        <form className='add-formz' onSubmit={handleSubmit(addCategory)}>
            <span>
                <input {...register("value")}  type="text" placeholder='' />
            </span>
            
            <button className='btn'>Add</button>
            <div className='' id='cate'>
                {
                    category.map((ele)=>(
                        <h1>{ele.value}</h1>
                    ))
                }
            </div>
        </form>
        {loader && <div className="loader"></div>}
    </div>
  )
}

export default Category