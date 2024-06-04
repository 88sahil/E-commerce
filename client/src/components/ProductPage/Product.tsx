import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ProductPage.scss'
import noimg from '../../assets/image/image.png'
import cart from '../../assets/image/add-to-cart.png'
import Rating from '@mui/material/Rating';
import { FaPencilAlt } from "react-icons/fa";
import {useForm,Controller} from 'react-hook-form'
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { PieChart } from '@mui/x-charts/PieChart';
type item={
    _id:string,
    title:string,
    publishedAt:Date,
    price:number,
    discount:number,
    coverphoto:string,
    coverphotoId:string,
    isAvailable:boolean,
    description:string,
    category:category,
    manufacturour:brand,
    AverageRating:number,
    NoofRating:number,
    photos:photo[] | []
    reviews:review[] |[]
    staticOfReview: staticsOfreview[] | []
}
type staticsOfreview={
    Rate:number,
    numberofRates:number
}
type photo = {
    id:string,
    photo:string,
    photoId:string
}
type brand={
    brandname:string,
    logo:string
}
type category={
    value:string
}
type review ={
    createdAt:Date,
    id:string,
    message:string,
    product:string,
    rating:number,
    user:{
        id:string,
        photo:string,
        username:string
    }
}
const Product =(props:{id:string})=>{
    let user = useSelector(state=>state.auth.user)
    const {handleSubmit,register,control} = useForm()
    const [writereview,setwritereview] = useState<boolean>(false);
    const [item,setitem] = useState<item>({})
    const [loader,setloader]=useState<boolean>(false)
    const [currImg,setCurrimg] = useState<string>()
    const getItem =async():Promise<void>=>{
        try{
            setloader(true);
            let response = await axios.get(`/api/v1/item/getItem/${props.id}`,{withCredentials:true})
            if(response.data.item){
                setitem(response.data.item)
                setCurrimg(item.coverphoto)
                setloader(false)
            }
        }catch(err){
            alert("error")
            const navigate = useNavigate()
            navigate('/');
        }
    }
    const filerReview = (id:number):Number=>{
        if(item?.staticOfReview?.length>0){
                let review:staticsOfreview = item.staticOfReview.find((ele)=>ele.Rate === id)
                if(review){
                    return review.numberofRates
                }else{
                    return 0;
                }
        }
        return 0;
    }
    let data=[
        { id: 0, value:filerReview(0),label:"0"},
        { id: 1, value: filerReview(1),label:"1" },
        { id: 2, value: filerReview(2),label:"2" },
        { id: 3, value:filerReview(3),label:"3" },
        { id: 4, value: filerReview(4),label:"4" },
        { id: 5, value: filerReview(5),label:"5" },
    ]
    useEffect(()=>{
        getItem();
        data=[
            { id: 0, value:filerReview(0),label:"0"},
            { id: 1, value: filerReview(1),label:"1" },
            { id: 2, value: filerReview(2),label:"2" },
            { id: 3, value:filerReview(3),label:"3" },
            { id: 4, value: filerReview(4),label:"4" },
            { id: 5, value: filerReview(5),label:"5" },
        ]
    },[])
    console.log(item)
    const ChangeImageOnHover = (e:React.MouseEvent<HTMLImageElement>):void=>{
            setCurrimg(e.target.currentSrc);
    }
    const ChangeImageOnClick = (e:React.FocusEvent<HTMLImageElement>):void=>{
        setCurrimg(e.target.currentSrc)
    }
    type TRdata={
        rating:number,
        message:string
    }
    const postrating =async(data:TRdata):Promise<void>=>{
        try{
            setloader(true)
            let response = await axios.post(`/api/v1/review/postreview/${item._id}`,data,{withCredentials:true})
            if(response.data){
              
                alert("review added")
                setloader(false)
                setwritereview(false)
                getItem()
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }
    const checkequal =(id1:string,id2:string):boolean=>{
            return id1===id2;
    }
    const deleteReview = async(id:string):Promise<void> =>{
        try{
            setloader(true)
            let response = await axios.get(`/api/v1/review/deleteReview/${id}`,{withCredentials:true})
            if(response.data){
                alert("review deleted successfully")
                setloader(false)
                getItem()
            }
        }catch(err){
            console.log(err)
            setloader(false)
        }
    }
   
   
    return(
        <div className="min-h-screen">
            {/*main product div*/}
            <div className={`flex flex-wrap`}>
                {/* left */}
                <section className={`Product-left flex ${writereview ? "opacity-70":""}`}>
                    <div className="left1 flex flex-col h-[500px] overflow-scroll gap-1">
                        {
                            item?.photos?.length>0? (
                                    item?.photos.map((ele)=>(
                                        <button className="bg-white w-[70px] h-[70px] p-2 rounded-md">
                                            <img className="small-images" onMouseEnter={ChangeImageOnHover} onClick={ChangeImageOnClick} src={ele.photo} alt="item photo"/>
                                        </button>
                                        
                                    )
                                )
                            ):(
                                <div className="bg-white w-[70px] h-[70px] p-2 rounded-md">
                                    <img src={noimg} alt="" />
                                </div>
                                
                            )
                        }
                    </div>
                    <div className="left2">
                        <img src={currImg || item.coverphoto || noimg} alt="" />
                    </div>
                    <button id="Cartbtn" className=" gap-1 flex items-center"><img className="w-[20px] h-[20px]" src={cart} alt="cart"></img>Add to cart</button>

                </section>
                {/* right */}
                <section className="Product-right p-4">
                        <h1 className="text-2xl font-extrabold">{item.title || ""}</h1>
                        <h1 className="text-xl mt-4 font-bold">{item.price-item.discount}&#x20B9;<span className="text-gray-200 italic line-through">{item.price}&#x20B9;</span></h1>
                        <div className="flex items- mt-4">
                            <Rating name="read-only" value={item.AverageRating || 0} readOnly/>
                            <a>{item.AverageRating || 0}{`(${item.NoofRating ||0})`}</a>
                        </div>
                        <div className="py-4">
                            <p className="italic  font-extrabold text-xl">About Product</p>
                            <p className="text-justify text-black-500">{item.description || " "}</p>
                        </div>
                        <div className="py-4">
                            <p className="italic  font-extrabold text-xl">Manufacturour</p>
                            <div className=" flex items-center">
                                <img src={item?.manufacturour?.logo || noimg} className="w-[70px] h-[70px] p-2 rounded-full" alt="no logo"></img>
                            </div>
                        </div>
                        <button id="reviewshow" onClick={()=>setwritereview(true)}>Write Review<FaPencilAlt/></button>
                        <div id="reviews" className="w-full">
                        <h1 className="mt-4 text-xl font-bold italic">Reviews<sup>*</sup></h1>
                        <PieChart
                        series={[
                                {
                                arcLabel: (item) => `${item.value}`,
                                data,
                                type: 'pie'
                                },
                            ]}
                            width={400}
                            height={400}
                             />
                           
                            {
                                item?.reviews?.length>0? (
                                    <div className="w-full">
                                        {
                                            item.reviews.map((ele)=>{
                                                return(
                                                    <div className="review-card">
                                                        <div className="review-card-1">
                                                            <div className="w-1/3 max-md:w-1/2">
                                                                <img src={ele.user.photo} alt="nophoto"></img>
                                                                <a className="text-gray-600 italic">@{ele.user.username || ""}</a>
                                                            </div>
                                                            <div className="flex     items-center gap-1 bg-green-600 text-white text-xl px-1">
                                                                <a>{ele.rating}</a>
                                                                <FaStar  fontSize={20} />
                                                            </div>
                                                            {
                                                                checkequal(`${ele.user.id || "1"}`,`${user?._id || ""}`)? (<button onClick={()=>deleteReview(ele.id)} className="w-[50px]"><MdDelete color="red" size={25}/></button>):(<div className="w-[50px]"></div>)
                                                            }
                                                        </div>
                                                        <div>
                                                            <p>{ele.message || ""}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ):(<h1>No Reviews😔</h1>)
                            }
                        </div>
                       {writereview && <form id="reviewform" onSubmit={handleSubmit(postrating)} >
                            <h1 className="text-xl">Write review</h1>
                            <div className="w-full">
                            <Controller control={control} name="rating" render={({field:{value,onChange}})=>(<Rating size={"large"} value={value} onChange={onChange}/>)} />
                            </div>
                           
                            <textarea placeholder="enter message here" rows={10} {...register("message",{required:"this field is compulsury"})}/>
                            <div className="flex gap-2">
                                <button className="bg-blue-500 px-4 py-2 text-white">Save</button>
                                <button className="bg-gray-500 px-4 py-2 text-white" onClick={()=>setwritereview(false)}>cancel</button>
                            </div>
                        </form>}
                </section>
            </div>
          { loader &&  <div className="loader"></div>}
        </div>
    )
}
export default Product