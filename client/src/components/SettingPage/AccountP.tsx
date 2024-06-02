import React, { useState } from "react";
import './Setting.scss'
import { useDispatch, useSelector } from "react-redux";
import SectionLabel from "../SectionLabel";
import axios from "axios";
import {login} from '../../store/AuthSlice'
type user={
    username:string,
    email:string,
    countrycode:string,
    number:Number,
    password:string,
    conformpassword:string,
    Address:Address,
    photo:string,
    photoid:string,
    likes:[string]
}
type Address = {
    coordinates:[Number],
    address:String,
    City:String,
    Country:String,
    type:String
}
const AccountPre=()=>{
    let user:user = useSelector(state=>state.auth.user)
    const dispatch = useDispatch();
    const [loader,setloader] = useState<Boolean>(false)
    let ErrorPhoto:string = useSelector(state=>state.auth.defaultImage)
    const [img,setimg]=useState<any>("")
    const UploadProfile =async()=>{
        try{
            if(img){
                setloader(true)
                let response = await axios.patch('/api/v1/user/uploadprofile',{profile:img},{
                    withCredentials:true,
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                })
                if(response.data.user){
                    setloader(false)
                    dispatch(login(response.data.user));
                }
            }else{
                setloader(false)
                alert("please choose photo")
            }
           
        }catch(err){
            alert("error")
        }
    }
    return(
        
            user? (
                <>
                 <div className={`account-main ${loader?("opacity-30"):("")}`}>
                    <section id="upload-profile w-full">
                    <SectionLabel label="Profile picture" />
                    <div className="profile-pic">
                        <img src={user?.photo || ErrorPhoto} title={user?.username  || "none" }/>
                        <input type="file" accept="image/*" onChange={(e)=>setimg(e.target.files[0])} />
                        <button onClick={()=>UploadProfile()}>Upload Profile</button>
                    </div>
                    
                </section>
                <section>
                    <SectionLabel label="user details"/>
                </section>
                </div>
                {loader && <div className="loader"></div>}
                </>
               
            ):(
                <div>Login</div>
            )
        
    )
}
export default AccountPre