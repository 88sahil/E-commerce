import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import './Login.scss'
import '../header/Header.scss'
import CountryCode from "../CountryCode";
import {login,logout} from '../../store/AuthSlice'
import {useDispatch} from 'react-redux'
import bg  from '../../assets/image/login-bg.jpg'
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                navigate('/');
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
                    <a className="text-gray-500 italic">Already Have an Account? <NavLink to={"/Login"} className="text-blue-500">SignIn</NavLink></a>
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
export default SignUp
import Google from '../../assets/image/google.png'
export const Login = ()=>{
    const dispatch = useDispatch();
    const [loader,setloader] = useState(false)
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm()
    const googleHandle =()=>{
        window.open("http://localhost:8000/auth/google/callback","_parent");
    }
    const handleLogin=async(data:{email:string,password:string})=>{
        try{
            setloader(true)
            let response = await axios.post('/api/v1/user/login',data,{withCredentials:true})
            if(response.data){
                dispatch(login(response.data.user))
                setloader(false)
                navigate('/');
            }
        }catch(err){
            setloader(false)
            alert(err.response.data.err)
        }
    }
    return(
        <>
        <div className={`w-full min-h-screen flex flex-col justify-center items-center  ${loader? "opacity-20":""}`}>
            <div className="main-2">
            <form className="login_form" onSubmit={handleSubmit(handleLogin)}>
                <div className="logo">
                    <a>MPF.</a>
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold">WelcomeBack to MPF.</h1>
                    <a className="text-gray-500 italic">new user? <NavLink to={"/SignUp"} className="text-blue-500">SignUp</NavLink></a>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" {...register("email")} placeholder="test@yahoo.com" required></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register("password")} placeholder="Enter Password" required></input>
                </div>
                <button>Login</button>
                <Link to={'/forgotpassword'} className="p-2 text-blue-500">Forgot password?</Link>
            </form>
            <div className="or flex mt-[15px] items-center justify-center">
                    <div className="w-1/3 h-[5px] bg-gray-400"></div>
                    <div className="w-3/12 flex justify-center"><a className="border border-black p-[5px] text-sm justify-center flex items-center rounded-full">OR</a></div>
                    <div className="w-1/3 h-[5px] bg-gray-400"></div>
            </div>
            <div className="goggle mt-[10px] flex justify-center items-center">
                <button className="flex items-center gap-2" onClick={googleHandle}><img className="w-[25px] h-[25px]" src={Google} alt="google"/>Login With Google</button>
            </div>
            </div>
            </div>
            {loader&&<div className="loader"></div>}
        </>
        
        
        
    )
}