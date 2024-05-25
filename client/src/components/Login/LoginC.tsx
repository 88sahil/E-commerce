import React from "react";
import {useForm} from 'react-hook-form'
import './Login.scss'
import CountryCode from "../CountryCode";
import bg  from '../../assets/image/login-bg.jpg'
const LoginC = ()=>{
    let {register,handleSubmit} = useForm()
    type inpdata ={
        username:string,
        email:string,
        countrycode:string,
        number:Number,
        password:string,
        conformpassword:string
    }
    const HandleSignUp =(data:inpdata)=>{

    }
    return(
        <div className="w-full min-h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(HandleSignUp)} className="login_form">
                <div>
                    
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" {...register("username")} placeholder="Enter username" required></input>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" {...register("email")} placeholder="Enter Email" required></input>
                </div>
                <div className="country">
                    <div>
                        <label>country</label>
                        <select {...register("countrycode")} required>
                            {
                                Object.keys(CountryCode).map((ele)=>(
                                    <option value={CountryCode[ele]}>{ele}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label>Mobail No</label>
                        <input type="Number" pattern="[0-9]{10}" title="please enter 10 Number" {...register("number")} required></input>
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
    )
}
export default LoginC