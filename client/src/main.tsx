import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter,Route,RouterProvider} from 'react-router-dom'
import Success from './components/Success.tsx'
import Payment from './components/Payment.tsx'
import {Login} from  './pages/index.ts'
const router:any = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },{
    path:'/login',
    element:<Login />
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
