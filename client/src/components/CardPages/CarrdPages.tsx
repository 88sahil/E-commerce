import axios from "axios";
import { useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import './CardPages.scss'
const CardPages =(props:{query:string})=>{
    const [Item,SetItem] = useState([]);
    let skel:number[] = [0,1,2,3,4,5];
    const GetItems =async()=>{
        try{
            let response = await axios.get(props.query,{withCredentials:true})
            if(response.data.items){
                SetItem(response.data.items)
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        GetItems()
    },[])
    return(
        <div className="cardpage flex flex-wrap gap-2 max-md:justify-center">
            {
                Item?.length>0?(
                    Item.map((ele,index)=><ItemCard key={index} item={ele}  />)
                ):(
                    skel.map(ele=><div className="skeleton" key={ele}></div>)
                )
                
            }
        </div>
    )
}
export default CardPages