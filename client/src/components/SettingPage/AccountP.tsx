import  { useEffect, useState } from "react";
import './Setting.scss'
import { useDispatch, useSelector } from "react-redux";
import SectionLabel from "../SectionLabel";
import axios from "axios";
import {login} from '../../store/AuthSlice'
import CountryCode from "../CountryCode";
import { FieldValues, useForm } from "react-hook-form";
type user={
    username:string,
    email:string,
    countryCode:string,
    number:Number,
    password:string,
    conformpassword:string,
    location:Address,
    photo:string,
    photoid:string,
    likes:[string]
}
type Address = {
    zipcode:number,
    address:String,
    City:String,
    Country:String,
    type:String
}
const AccountPre=()=>{
    const [isDisable,setisDisable] = useState<boolean>(true)
    const [isAdisable,setisAdisable] =useState<boolean>(true)
    let user:user = useSelector((state:any)=>state.auth.user)
    const dispatch = useDispatch();
    const [loader,setloader] = useState<Boolean>(false)
    let ErrorPhoto:string = useSelector((state:any)=>state.auth.defaultImage)
    const [img,setimg]=useState<any | null>("")
    const {register,handleSubmit,reset} = useForm({
        defaultValues:{
            email:user?.email || "",
            username:user?.username || '',
            countryCode:user?.countryCode || "",
            number:user?.number ||0,
            City:user?.location?.City || "None",
            address:user?.location?.address || " ",
            Country:user?.location?.Country || "india",
            zipcode:user?.location?.zipcode || 360000
        }
    })
    useEffect(()=>{
        reset({
                email:user?.email || "",
                username:user?.username || '',
                countryCode:user?.countryCode || "",
                number:user?.number ||0,
                City:user?.location?.City || "None",
                address:user?.location?.address || " ",
                Country:user?.location?.Country || "india",
                zipcode:user?.location?.zipcode || 360000
        })
    },[])
    const UploadProfile =async()=>{
        try{
            if(img){
                setloader(true)
                let response = await axios.patch('https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/api/v1/user/uploadprofile',{profile:img},{
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
    const updateUserData=async(data:FieldValues):Promise<void>=>{
        console.log(data)
        try{
            setisDisable(true)
            setloader(true)
            let response = await axios.patch("https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/api/v1/user/updateMe",data,{withCredentials:true})
            if(response.data){
                setloader(false)
                dispatch(login(response.data.user))
            }
        }catch(err){
            setloader(false)
            console.log(err)
            alert(err)
        }
    }
    // address
    interface Tlocation{
        address:string,
        City:string,
        zipcode:number,
        Country:string
    }
    const updatelocation =async(data:FieldValues):Promise<void>=>{
        let AddressObj:Tlocation = {
            address:data.address,
            City:data.City,
            zipcode:data.zipcode,
            Country:data.Country
        }
        try{
            setloader(true)
            let response = await axios.patch("https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/api/v1/user/updateMe",{location:AddressObj},{withCredentials:true})
            if(response.data){
                setloader(false)
                dispatch(login(response.data.user))
            }
        }catch(err){
            setloader(false)
            alert(err)
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
                        <input  name="img" type="file" accept="image/*" onChange={(e:any)=>setimg(e.target.files[0])} />
                        <button onClick={()=>UploadProfile()}>Upload Profile</button>
                    </div>
                    
                </section>
                <section id="userdetails">
                    <SectionLabel label="user details"/>
                    <form onSubmit={handleSubmit(updateUserData)}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="text"  {...register("email")} disabled/>
                        </div>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input type="text"   {...register("username")} disabled={isDisable}/>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="country">Country</label>
                                <select   {...register("countryCode")} disabled={isDisable}>
                                    {
                                        Object.keys(CountryCode).map((ele,index)=>(
                                            <option value={Object.keys(CountryCode).includes(ele) ? `${CountryCode[ele]}` : undefined} key={index}>{ele}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label>Number</label>
                                    <input type="number"  {...register("number")} inputMode="tel" disabled={isDisable}/>
                            </div>
                        </div>
                        <div>
                        {isDisable? (<button className="bg-blue-500" onClick={(e)=>{e.preventDefault();setisDisable(false)}}>Edit</button>):(<button className="bg-blue-400">Save</button>)}
                        <button className="bg-red-500" onClick={()=>{setisDisable(true)}}>Cancel</button>
                        </div>
                       
                    </form>
                </section>
                <section id="useraddress" className="py-10">
                        <SectionLabel label="address" />
                        <form onSubmit={handleSubmit(updatelocation)}>
                            <div>
                                <label htmlFor="Address">Address</label>
                                <input type="text"  {...register("address")} disabled={isAdisable} required/>
                            </div>
                            <div>
                                <label htmlFor="City">City</label>
                                <input type="text"  {...register("City")} disabled={isAdisable} required/>
                            </div>
                            <div>
                                <label htmlFor="zipcode">ZipCode</label>
                                <input type="Number" maxLength={6}  {...register("zipcode")} disabled={isAdisable} required/>
                            </div>
                            <div>
                                <label htmlFor="Address">Country</label>
                                <select {...register("Country")} disabled={isAdisable} required>
                                    {
                                        Object.keys(CountryCode).map((ele)=>(
                                            <option value={ele}>{ele}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                {isAdisable? (<button className="bg-blue-500" onClick={()=>{setisAdisable(false)}}>Edit</button>):(<button className="bg-blue-400">Save</button>)}
                                <button className="bg-red-500" onClick={()=>{setisAdisable(true)}}>Cancel</button>
                            </div>
                           
                        </form>
                       
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