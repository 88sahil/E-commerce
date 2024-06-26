import { createSlice } from "@reduxjs/toolkit";
import dUser from '../assets/image/7309681.jpg'
type user={
    username:string,
    email:string,
    countrycode:string,
    number:Number,
    password:string,
    conformpassword:string,
    Address:Address
}
type Address = {
    zipcode:number,
    address:String,
    City:String,
    Country:String,
    type:String
}
type inits = {
    user:user | null,
    Active:boolean,
    defaultImage:string
}
const initialState:inits = {
    user:null,
    Active:false,
    defaultImage:dUser
}

const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user = action.payload,
            state.Active = true
        },
        logout:(state)=>{
            state.user = null,
            state.Active = false
        }
    }
})

export const{login,logout} = AuthSlice.actions
export default AuthSlice.reducer