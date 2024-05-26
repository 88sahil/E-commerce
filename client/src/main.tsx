import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Store from './store/Store.ts'
import {Provider}  from  'react-redux'
import {createBrowserRouter,Route,RouterProvider} from 'react-router-dom'
import Success from './components/Success.tsx'
import Payment from './components/Payment.tsx'
import {SignUpPage,LoginPage} from  './pages/index.ts'
const router:any = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/SignUp',
    element:<SignUpPage />
  },
  {
    path:'/Login',
    element:<LoginPage/>
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
