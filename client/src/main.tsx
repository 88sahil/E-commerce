import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Store from './store/Store.ts'
import {Provider}  from  'react-redux'
import {createBrowserRouter,RouterProvider,Router} from 'react-router-dom'
import {SignUpPage,AllProductpage,LoginPage,Home,LikePage,Setting, AccountPrefference, PrivacyPage, ProductPage, CartPage, MyOrderPage, AdminPage} from  './pages/index.ts'
import Success from './components/success/Succes.tsx'
import OrderPage from './components/Orders/OrderPage.tsx'
import Statics from './components/Admin/Statics.tsx'
import AdminOrder from './components/Admin/Admin-Order.tsx'
import AddItem from './components/Admin/AddItem.tsx'
import Items from './components/Admin/Items.tsx'
import EditItem from './components/Admin/EditItem.tsx'
import Brands from './components/Admin/Brands.tsx'
import Category from './components/Admin/Category.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'
import Changepassword from './pages/changepassword.tsx'
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
        element:<AdminPage/>,
        children:[
          {
            path:'/admin/static',
            element:<Statics/>
          },{
            path:'/admin/Orders',
            element:<AdminOrder/>
          },{
            path:'/admin/AddItem',
            element:<AddItem/>
          },{
            path:'/admin/Items',
            element:<Items/>
          },{
            path:'/admin/EditItem/:id',
            element:<EditItem/>
          }
          ,{
            path:'/admin/brands',
            element:<Brands/>
          },{
            path:'/admin/Categories',
            element:<Category/>
          }
        ]
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
  },{
    path:'/forgotpassword',
    element:<ForgotPassword/>
  },
  {
    path:'/changepassword/:str',
    element:<Changepassword/>
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
)
