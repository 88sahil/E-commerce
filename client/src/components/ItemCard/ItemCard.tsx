import axios from "axios";
import  { useState } from "react";
import { BiLike } from "react-icons/bi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
type Item={
    _id:string,
    price: number,
    coverphoto:string,
    title:string,
    discount:number
}
const ItemCard = (props:{item:Item,key:number})=>{
    const userLikes = useSelector((state:any)=>state.auth.user)
    let isLiked = userLikes?.likes.find((ele:string)=>ele===props.item._id) || false;
    const [liked,setliked] = useState(isLiked? true:false);
    const LikeItem =async(id:string)=>{
        try{
            let response = await axios.get(`https://e-commerce-wvh2-qw50sstcd-88sahils-projects.vercel.app/api/v1/user/LikeItem?Itemid=${id}`,{withCredentials:true})
            if(response.data){
                alert(`${props.item.title} ${liked? "disliked":"liked"} successfully`);
            }
        }catch(err){
            console.log("hello")
        }
    }
    const handleLikebtn =()=>{
        setliked(prev=>!prev)
        LikeItem(props.item._id);
    }
    return(
        <NavLink to={`/product/${props.item._id}`} key={props.key} className="w-[300px] p-2 max-md:h-[300px] max-md:w-[180px] mt-3 h-[350px] shadow-md">
            <img src={props.item.coverphoto} alt="coverphoto" className="w-full max-md:h-[200px] h-[250px]  object-contain"/>
            <h3 className=" px-2 text-xl w-full mt-[5px] text-center"><BiLike size={25} onClick={()=>handleLikebtn()} color={`${liked?"red":""}`}/></h3>
            <h1 className="px-2 text-xl max-md:text-sm font-bold text-start">{props.item.title}</h1>
            <h1 className="px-2 text-start">&#x20b9;{props.item.price-props.item.discount}</h1>
        </NavLink>
    )
}
export default ItemCard
