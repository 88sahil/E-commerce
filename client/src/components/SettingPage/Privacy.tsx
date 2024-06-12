import  { useState } from "react";
import SectionLabel from "../SectionLabel";
import { FieldValues, useForm } from "react-hook-form";
import './Setting.scss'
import axios from "axios";
import { useDispatch } from "react-redux";
import {logout} from '../../store/AuthSlice'
import { useNavigate } from "react-router-dom";
const Privacy=()=>{
    const [loader,setloader] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register,handleSubmit} = useForm()
    const changepassword =async(data:FieldValues):Promise<void>=>{
        try{
            setloader(true);
            let response = await axios.patch("https://e-commerce-wvh2.vercel.app/api/v1/user/changepassword",data,{withCredentials:true})
            if(response.data){
                setloader(false)
                alert("password changed successfully")
            }
        }catch(err:any){
            setloader(false)
            alert(err.response.data.err)
        }
    }
    const deleteUser = async ():Promise<void>=>{
        setloader(true)
        try{
            let response = await axios.patch('https://e-commerce-wvh2.vercel.app/api/v1/user/updateMe',{isactive:false},{withCredentials:true})
            if(response.data){
                setloader(false)
                dispatch(logout())
                navigate('/')
            }
        }catch(err:any){
            setloader(false)
            console.log(err)
            alert(err.repsonse.data.err)
        }
    }
    return(
        <>
        <div className={`w-full ${loader? "opacity-50":""}`}>
            <section id="ChangePassword">
                <SectionLabel label="Change password" />
                <form onSubmit={handleSubmit(changepassword)}>
                    <div>
                        <label htmlFor="oldpassword">oldpassword</label>
                        <input type="password" placeholder="Enter Old Password"  {...register("oldpassword")} />
                    </div>
                    <div>
                        <label htmlFor="oldpassword">newpassword</label>
                        <input type="password"placeholder="Enter New Password"{...register("newpassword")}/>
                    </div>
                    <div>
                        <label htmlFor="oldpassword">Conform newpassword</label>
                        <input type="password" placeholder="Conform New Password" {...register("newconformpassword")} />
                    </div>
                    <div>
                        <button className="bg-red-500 text-white">Change Password</button>
                    </div>
                </form>
                
            </section>
            <section className="w-full flex flex-col items-center">
                <SectionLabel label="DeleteUser"/>
                <button className="border-1 border-red-500 border px-4 py-2" onClick={()=>deleteUser()}>DeleteMe</button>
            </section>
        </div>
        {loader && <div className="loader"></div>}
        </>
        
    )
}
export default Privacy