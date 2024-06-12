import axios from 'axios'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
const ForgotPassword = () => {
const {handleSubmit,register} = useForm()
const [loader,setloader] = useState<boolean>(false)
const forgotpassword=async(data:FieldValues)=>{
    try{
        setloader(true)
        let response = await axios.get(`https://e-commerce-wvh2.vercel.app/api/v1/user/forgotpassword?email=${data.email}`,{withCredentials:true})
        if(response.data){
            setloader(false)
            alert("password reset Link successfully sent")
        }
    }catch(err:any){
        setloader(false)
        alert(err.response.data.err)
        console.log(err)
    }
}
  return (
    <div className='flex items-center justify-center min-h-screen'>
        <div className='w-[600px] max-md:w-full shadow-sm rounded-md shadow-black p-5 '>
        <form className="login_form" onSubmit={handleSubmit(forgotpassword)}>
                <div className="logo">
                    <a>MPF.</a>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" {...register("email")} placeholder="test@yahoo.com" required></input>
                </div>
                <button>ResetLink</button>
            </form>
        </div>
       {loader && <div className="loader"></div>}
    </div>
  )
}

export default ForgotPassword