import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import './Login.scss'
import '../header/Header.scss'
import CountryCode from "../CountryCode";
import {login,logout} from '../../store/AuthSlice'
import {useDispatch} from 'react-redux'
import bg  from '../../assets/image/login-bg.jpg'
import { NavLink } from "react-router-dom";
import axios from "axios";
const LoginC = ()=>{
    const dispatch = useDispatch()
    const [loader,setloader] = useState(false);
    let {register,handleSubmit} = useForm()
    type inpdata ={
        username:string,
        email:string,
        countrycode:string,
        number:Number,
        password:string,
        conformpassword:string
    }
    const HandleSignUp =async(data:inpdata)=>{
        try{
            setloader(true);
            let response = await axios.post("/api/v1/user",data,{withCredentials:true});
            if(response.data){
                dispatch(login(response.data.user))
                setloader(false);
            }
        }catch(err){
            setloader(false)
            alert("error")
        }
    }
    return(
        <>
        <div className={`main w-full min-h-screen flex justify-center items-center  ${loader? "opacity-20":""}`}>
            <form onSubmit={handleSubmit(HandleSignUp)} className="login_form">
                <div className="logo">
                    <a>MPF.</a>
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold">Get Start With MPF.</h1>
                    <a className="text-gray-500 italic">Already Have an Account? <NavLink to={""} className="text-blue-500">SignIn</NavLink></a>
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" {...register("username")} placeholder="john_doe" required></input>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" {...register("email")} placeholder="test@yahoo.com" required></input>
                </div>
                <div className="country">
                    <div>
                        <label>country</label>
                        <select {...register("countryCode")} required>
                            {
                                Object.keys(CountryCode).map((ele,index)=>(
                                    <option value={CountryCode[ele]} key={index}>{ele}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label>Mobail No</label>
                        <input type="Number" pattern="[0-9]{10}" placeholder="8888888888" title="please enter 10 Number" {...register("number")} required></input>
                    </div>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register("password")} placeholder="Enter password" required></input>
                </div>
                <div>
                    <label>Conform password</label>
                    <input type="password" {...register("conformpassword")} placeholder="Enter password" required></input>
                </div>
                <button>SignUp</button>
            </form>
            
        </div>
        {loader && <div className={`loader  ${loader? "opacity-100":""}`}></div>}
        </>
        
    )
}
export default LoginC