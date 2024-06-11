import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import './AllProduct.scss'
import axios from "axios";
import ItemCard from "../ItemCard/ItemCard";
import Pagination from '@mui/material/Pagination';
const AllProduct =()=>{
    type brand = {
        _id:string,
        brandname:string
    }
    type categories = {
        _id:string,
        value:string
    }
    type item={
        category:{
            value:string
        },
        coverphoto:string,
        discount:number,
        id:string,
        manufacturour:{
            brandname:string,
            logo:string,
        },
        price:number,
        title:string,
        _id:string
    }
    const [item,setitem] =useState<item[]>([])
    const [totalproducts,settotalproducts] = useState<number>(0)
    const [brands,setbrands] = useState<brand[]>([])
    const [querybrands,setquerybrands]=useState<string[]>([])
    let [querycategories,setquerycategories]=useState<string[]>([])
    const [categoris,setcategoris] = useState<categories[]>([]);
    const [sort,setsort] = useState<string>("");
    const [page,setpage] = useState<number>(0);
    const [loader,setloader] = useState<boolean>(false)
    const [lprice,setlprice] = useState<number>(0)
    const[gprice,setgprice]=useState<number>(10000000000)
    const checked=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        setsort(e.target.value)
    }
    const querybrandAndcateFnc = (e:any,values:string[],setvalue:any):void=>{
        const {value,checked} = e.target;
        if(checked){
                setvalue([...values,value])
        }else{
            setvalue(values.filter((ele)=>ele!==value))
        }
    }
    const converttoString = (queryArry:string[],fieldname:string):string=>{
        let res=""
        let arr = queryArry.map((ele)=>ele)
        for (let ele in arr){
            arr[ele] = `${fieldname}=${arr[ele]}`
        }
        if(arr.length>0){
            res=arr.join('&')
        }
        return res
    }
    
    const getProducts = async():Promise<void>=>{
        let query:string = `/api/v1/item/getAllitems?page=${page}&limit=20&${converttoString(querybrands,"manufacturour")}&${converttoString(querycategories,"category")}&price[gte]=${lprice}&price[lte]=${gprice}&sort=${sort}&fields=_id,price,title,coverphoto,discount`
        try{
            setloader(true)
            let response = await axios.get(query,{withCredentials:true})
            if(response.data){
                setloader(false)
                settotalproducts(response.data.totalitems)
                setitem(response.data.items)
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }
    const showLeft=()=>{
        let div:any | null | undefined  = document.getElementById("leftdiv")
        div?.classList.toggle("left-show")
        div?.classList.toggle("left")
    }
    useEffect(()=>{
        getBrandAndCate()
        getProducts()
    },[querybrands,querycategories,sort,page])
    const getBrandAndCate =async():Promise<void>=>{
        try{
            setloader(true)
            let brandsres = await axios.get('/api/v1/brands/getAllbrands',{withCredentials:true})
            if(brandsres.data){
                setbrands(brandsres.data.brands);
            }
            let categoryres = await axios.get('/api/v1/category',{withCredentials:true})
            if(categoryres.data){
                setcategoris(categoryres.data.categories)
                setloader(false)
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }
    return(
        <section className="flex">
               { <div className="leftf" id="leftdiv">
                        <div className="sort w-full p-2">
                            <h1>Sort Item</h1>
                            <input type="radio" name="sort" value="price" onChange={(e)=>checked(e)}/> <a>price:Low to High</a>
                            <br></br>
                            <input type="radio" name="sort" value="-price" onChange={(e)=>checked(e)}/><a>price:High to Low</a>
                            <br></br>
                            <input type="radio" name="sort" value="title" onChange={(e)=>checked(e)}/> <a>Name</a>
                            <br></br>
                            <input type="radio" name="sort" value="publishedAt" onChange={(e)=>checked(e)}/> <a>Date</a>
                            <br></br>   
                        </div>
                        <div className="categories">
                            <h1>categories</h1>
                            {
                                categoris?.length>0?(<div>
                                    {
                                        categoris.map((ele,index)=>(
                                            <div key={index}>
                                                <input type="checkbox" name={ele.value} value={ele._id} onChange={(e)=>querybrandAndcateFnc(e,querycategories,setquerycategories)}></input>{ele.value}
                                            </div>
                                        ))
                                    }
                                </div>):(<h1>no Category found</h1>)
                            }
                        </div>
                        <div className="brands">
                            <h1>brands</h1>
                            {
                                brands?.length>0?(<div>
                                    {
                                        brands.map((ele)=>(
                                            <div>
                                                <input type="checkbox" onClick={(e)=>querybrandAndcateFnc(e,querybrands,setquerybrands)} value={ele._id}></input>{ele.brandname}
                                            </div>
                                        ))
                                    }
                                </div>):(<h1>no brands found</h1>)
                            }
                        </div>
                        <div className="flex flex-col p-4 items-center">
                        <h1 className="text-xl font-bold">Price range</h1>
                        <input type="Number" placeholder="from" value={lprice} max={gprice} className="w-[180px] p-2" onChange={(e)=>setlprice(Number.parseInt(e.target.value))}  />
                        <h1 className="text-xl font-bold">to</h1>
                            <input type="Number" placeholder="to" value={gprice} min={lprice} className="w-[180px] p-2" onChange={(e)=>setgprice(Number.parseInt(e.target.value))} />
                        </div>
                        
                        <button className="close" onClick={showLeft}>close</button>
                        <button id="filter" onClick={()=>getProducts()}>filter</button>
                </div>}
                <div className="p-4 w-full min-h-screen">
                   <h1 className="w-full text-start text-xl font-extrabold">total results-{totalproducts || 0}</h1>
                   <div className="products" >
                            {
                                item.length>0?(<div className="w-full flex flex-wrap gap-2 max-md:justify-center">
                                    {
                                        item?.map((ele,index)=><ItemCard key={index} item={ele}/>)
                                    }
                                </div>):(<div>no item available</div>)
                            }
                    </div> 
                    <div className="mt-2 w-full justify-center p-2">
                        <Pagination onChange={(e,page)=>{e;setpage(page)}}  count={totalproducts/20>1? (totalproducts/20):(1)}/>
                    </div>
                    
                </div>
                {loader && <div className="loader"></div>}
                <button id="filter-btn" onClick={()=>showLeft()}><FaFilter color="white" size={35}/></button>
        </section>
    )
}
export default AllProduct