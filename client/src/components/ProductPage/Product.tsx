import { MouseEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './ProductPage.scss'
import noimg from '../../assets/image/image.png'
import cart from '../../assets/image/add-to-cart.png'
import Rating from '@mui/material/Rating';
import { FaPencilAlt } from "react-icons/fa";
import {useForm,Controller, FieldValues} from 'react-hook-form'
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { PieChart } from '@mui/x-charts/PieChart';
type item={
    _id:string,
    title:string,
    publishedAt:Date,
    price:number | undefined | null,
    discount:number | undefined | null,
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
const Product =()=>{
    let user = useSelector((state:any)=>state.auth.user)
    const {handleSubmit,register,control} = useForm()
    const [writereview,setwritereview] = useState<boolean>(false);
    const [item,setitem] = useState<item | null | undefined>();
    const [loader,setloader]=useState<boolean>(false)
    const [currImg,setCurrimg] = useState<string>()
    const {id} = useParams()
    let deimag = useSelector((state:any)=>state.auth.defaultImage)
    const getItem =async():Promise<void>=>{
        try{
            setloader(true);
            let response = await axios.get(`/api/v1/item/getItem/${id}`,{withCredentials:true})
            if(response.data.item){
                setitem(response.data.item)
                setloader(false)
            }
        }catch(err){
            alert("error")
            const navigate = useNavigate()
            navigate('/');
        }
    }
    const filerReview = (id:number):Number=>{
        if(item?.staticOfReview? item.staticOfReview.length>0:0){
                let review:staticsOfreview | null | undefined = item?.staticOfReview.find((ele)=>ele.Rate === id)
                if(review){
                    return review.numberofRates
                }else{
                    return 0;
                }
        }
        return 0;
    }
    let data:any=[
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
    },[id])
    const addtocart = async()=>{
        try{
            setloader(true)
            let response = await axios.post("/api/v1/cart/addItem",{item:item?._id,pricetopay:item?.price? item.price:0-(item?.discount? item?.discount:0)},{withCredentials:true})
            if(response.data){
                setloader(false)
            }
        }catch(err){
            console.log(err)
            setloader(false)
        }
    }
    const ChangeImageOnClick:MouseEventHandler<HTMLImageElement>  = (e):void=>{
        setCurrimg((e.target as HTMLImageElement).src);
    }
    const postrating =async(data:FieldValues):Promise<void>=>{
        try{
            setloader(true)
            let response = await axios.post(`/api/v1/review/postreview/${item?._id}`,data,{withCredentials:true})
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
            <div className={`w-full flex flex-wrap`}>
                {/* left */}
                <section className={`Product-left flex ${writereview ? "opacity-70":""}`}>
                    <div className="left1 flex flex-col h-[500px] overflow-scroll gap-1">
                        {
                            (item?.photos? (item?.photos.length):(0))>0? (
                                    item?.photos.map((ele)=>(
                                        <button className="bg-white w-[70px] h-[70px] p-2 rounded-md">
                                            <img className="small-images object-contain w-[70px] h-[50px]" onClick={ChangeImageOnClick} src={ele.photo} alt="item photo"/>
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
                        <img src={currImg || item?.coverphoto || noimg} className="object-contain" alt="" />
                    </div>
                    <button id="Cartbtn" className=" gap-1 flex items-center" onClick={addtocart}><img className="w-[20px] h-[20px]" src={cart} alt="cart"></img>Add to cart</button>

                </section>
                {/* right */}
                <section className="Product-right p-4">
                        <h1 className="text-2xl font-extrabold">{item?.title || ""}</h1>
                        <h1 className="text-xl mt-4 font-bold">{item?.price? item.price : 0 - (item?.discount ? item.discount : 0)}&#x20B9;<span className="text-gray-200 italic line-through">{item?.price || 0}&#x20B9;</span></h1>
                        <div className="flex items- mt-4">
                            <Rating name="read-only" value={item?.AverageRating || 0} readOnly/>
                            <a>{item?.AverageRating || 0}{`(${item?.NoofRating ||0})`}</a>
                        </div>
                        <div className="py-4">
                            <p className="italic  font-extrabold text-xl">About Product</p>
                            <p className="text-justify text-black-500">{item?.description || " "}</p>
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
                                (item?.reviews ? (item.reviews.length):(0))>0? (
                                    <div className="w-full">
                                        {
                                            item?.reviews.map((ele)=>{
                                                return(
                                                    <div className="review-card">
                                                        <div className="review-card-1">
                                                            <div className="w-1/3 max-md:w-1/2">
                                                                <img src={ele.user.photo || deimag} alt="nophoto"></img>
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