import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Cart.scss'
const Cart =()=>{
    type cart={
        created:Date,
        id:string,
        totalbill:number,
        user:string,
        _id:string,
        products:product[]
    }
    type product={
        cartId:string,
        id:string,
        pricetopay:number,
        quantity:number,
        totalprice:number,
        item:items
    }
    type items={
        category:{
            value:string
        }
        coverphoto:string,
        discount:string,
        id:string,
        manufacturour:{
            brandname:string,
            logo:string
        },
        price:number,
        title:string
    }
    const [loader,setloader] = useState<boolean>(false)
    const [cart,setCart] = useState<cart>({});
    const getcart = async():Promise<void>=>{
        try{
            let response = await axios.get(`api/v1/cart/getCart`,{withCredentials:true})
            if(response.data){
                setCart(response.data.cart);
            }
        }catch(err){
            console.log(err)
        }
    }
    const removeItem = async(id:string):Promise<void>=>{
        try{
            setloader(true)
            let response = await axios.post(`/api/v1/cart/removeItem`,{itemId:id,cartId:cart._id})
            if(response.data){
                setloader(false)
                setCart(response.data.cart)
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }
    const checkout = async():Promise<void>=>{
        try{
            setloader(true)
            let response = await axios.post(`/api/v1/checkout`,{item:cart},{withCredentials:true})
            console.log(response.data)
            if(response.data){
                setloader(false)
                window.open(response.data.session,"_parent")
            }
        }catch(err){
            setloader(false)
            alert("fail to checkout")
            console.log(err)
        }
    }
    const addItem = async(id:string,price:number):Promise<void>=>{
        try{
            setloader(true)
            let response = await axios.post(`api/v1/cart/addItem`,{item:id,pricetopay:price},{withCredentials:true})
            setCart(response.data.cart)
            setloader(false)
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }
    useEffect(()=>{
        getcart();
    },[])

    return(
        <div className="p-4 max-md:px-0 max-md:p-0 max-md:mt-10 min-h-screen w-full flex  justify-center  py-5">
            
            {
                cart?.products?.length>0? (
                    <div className={`p-3 min-h-screen shadow-md ${loader? "opacity-60":""}`}>
                        <h1 className="text-xl font-extrabold text-start w-full">Cart</h1>
                        {
                              cart?.products.map((ele)=>(
                                <div className="mt-10 flex border-b border-gray-300 pb-2 justify-between w-[800px] max-md:w-full items-center">
                                    <img src={ele.item.coverphoto} className="w-[100px] max-md:w-[80px] max-md:h-[80px] rounded-lg h-[100px]" alt="cartitem"></img>
                                    <Link to={`/product/${ele.item.id}`}>{ele.item.title}</Link>
                                    <div className="addbtn">
                                        <button className=" " onClick={()=>removeItem(ele.item.id)}>-</button>
                                        <h1>{ele.quantity}</h1>
                                        <button className="" onClick={()=>addItem(ele.item.id,ele.pricetopay)}>+</button>
                                    </div>
                                    <h1 className="w-[70px]">&#x20b9; {ele.totalprice}</h1>
                                </div>
                              ))
                        }
                        <div className="flex w-full flex-col items-center p-4">
                            <h1 className="text-xl font-bold">total bill:  {`${cart?.totalbill}`}</h1>
                            <button className="px-4 py-1.5 bg-red-500 text-white" onClick={checkout}>Checkout Items</button>
                        </div>
                        
                    </div>
                      
                   
                ):(<div>Go and Shop</div>)
            }
            {loader && <div className="loader"></div>}
        </div>
    )
}
export default Cart