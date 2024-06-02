import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Store from './store/Store.ts'
import {Provider}  from  'react-redux'
import {createBrowserRouter,Route,RouterProvider} from 'react-router-dom'
import Success from './components/Success.tsx'
import Payment from './components/Payment.tsx'
import {SignUpPage,LoginPage,Home,LikePage,Setting, AccountPrefference, PrivacyPage} from  './pages/index.ts'
const router:any = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home />
      },{
        path:'/likes',
        element:<LikePage/>
      },{
        path:'/setting',
        element:<Setting/>,
        children:[{
          path:'/setting/account',
          element:<AccountPrefference/>
        },{
          path:'/setting/privacy',
          element:<PrivacyPage/>
        }]
      }
    ]
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
