import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Store from './store/Store.ts'
import {Provider}  from  'react-redux'
import {createBrowserRouter,Route,RouterProvider} from 'react-router-dom'
import {SignUpPage,AllProductpage,LoginPage,Home,LikePage,Setting, AccountPrefference, PrivacyPage, ProductPage, CartPage, MyOrderPage, AdminPage} from  './pages/index.ts'
import Success from './components/success/Succes.tsx'
import OrderPage from './components/Orders/OrderPage.tsx'
const router:any = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home />
      },{
        path:'/admin',
        element:<AdminPage/>
      },
      {
        path:'/success/:id',
        element:<Success/>
      },
      {
        path:'/myorders',
        element:<MyOrderPage/>
      },
      {
        path:'/order/:id',
        element:<OrderPage/>
      },
      {
        path:'/cart',
        element:<CartPage/>
      }
      ,
        {
          path:'/product/:id',
          element:<ProductPage/>
        }
      ,{
        path:'/likes',
        element:<LikePage/>
      },
        {
          path:'/AllProducts',
          element:<AllProductpage/>
        }
      ,{
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
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
)
