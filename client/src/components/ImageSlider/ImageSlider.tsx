import React, { useState } from "react";
import './ImageSlider.scss'
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
const ImageSlider =(props:{images:String[]})=>{
    let Images = [...props.images]
    const [curridx,setcurridx] = useState(0);
    const HandlePrev = ()=>{
        if(curridx>0){
            setcurridx(prev=>prev-1)
        }else{
            setcurridx(Images.length-1);
        }
    }
    const HandleNext = ()=>{
        if(curridx<Images.length-1){
            setcurridx(prev=>prev+1)
        }else{
            setcurridx(0);
        }
    }
    const HandelDots =(indx:number)=>{
        setcurridx(indx);
    }
    return(
        <div className="main-slider mt-12 px-28 max-md:p-4   relative">

                {
                    Images.length>0?(<div>
                        {
                         <img src={Images[curridx]} className="SliderImages w-full"  alt="Slider Image" />
                        }
                    </div>):(<h1>No Image</h1>)
                }
                <button onClick={HandlePrev} className="absolute top-[50%]"><FcPrevious fontSize={55} fontWeight={"bolder"}/></button>
                <button onClick={HandleNext} id="Next" className="absolute top-[50%] right-[50px]"><FcNext fontSize={55} fontWeight={"bolder"}/></button>
                <div className="dots flex gap-1 p-2 absolute bottom-0">
                    {
                        Images.map((ele,index)=>(
                            <button  className={`${index===curridx?"Activebtn":""} h-[20px] w-[20px] duration-200 flex text-5xl items-center justify-center`} onClick={()=>HandelDots(index)}>•</button>
                        ))
                    }
                </div>
        </div>
    )
}
export default ImageSlider