import {configureStore} from '@reduxjs/toolkit'
import  AuthSlice from './AuthSlice'


const Store:any = configureStore({
    reducer:{
        "auth":AuthSlice
    }
})

export default Store