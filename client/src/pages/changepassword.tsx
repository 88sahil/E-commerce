import axios from 'axios'
import  { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const Changepassword = () => {
        const {str} = useParams()
        const {handleSubmit,register} = useForm()
        const [loader,setloader] = useState<boolean>(false)
        const navigate = useNavigate()
        const forgotpassword=async(data:FieldValues):Promise<void>=>{
            try{
                setloader(true)
                let response = await axios.patch(`/api/v1/user/updatepassword/${str}`,data,{withCredentials:true})
                if(response.data){
                    setloader(false)
                    alert(response.data.message)
                    navigate('/Login')
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
                <label>new password</label>
                <input type="password" {...register("password")} placeholder="Enter new password" required></input>
            </div>
            <div>
                <label>conform newpassword</label>
                <input type="password" {...register("conformpasword")} placeholder="conform new password" required></input>
            </div>
            <button>ResetLink</button>
        </form>
    </div>
   {loader && <div className="loader"></div>}
    </div>
  )
}
export default Changepassword