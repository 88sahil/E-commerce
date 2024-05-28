import { useEffect, useState } from 'react'
import { Header } from './components'
import './App.css'
import {login} from './store/AuthSlice'
import { UseDispatch, useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const verifyUser =async()=>{
    try{
      let response = await axios.get('/api/v1/user/verify',{withCredentials:true})
      if(response.data){
          dispatch(login(response.data.user));
      }
    }catch(err){
      navigate('/')
    }
  } 
  useEffect(()=>{
    verifyUser()
  },[])
  return (
      <div>
        <Header/>
        <Outlet/>
      </div>
  )
}

export default App
