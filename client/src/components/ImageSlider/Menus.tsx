import React from "react";
import './ImageSlider.scss'
import furniture from '../../assets/image/furniture.jpg'
import electronics from '../../assets/image/electronics.jpg'
import fashion from '../../assets/image/fa.jpg'
import grocery from '../../assets/image/grocery.jpg'
import { NavLink } from "react-router-dom";
const Menus =()=>{
    return(
        <div className="main-grid pb-10">
            <div className="grid1 relative ">
                <img src={furniture} alt="furniture" className="w-full h-full object-center rounded-xl"/>
                <div className="absolute z-10 bottom-2 left-3 text-xl text-white">
                    <h1>Furniture</h1>
                </div>
            </div>
            <div className="grid2 relative"><img src={electronics} alt="electronics" className="w-full rounded-xl h-full object-center"/>
            <div className="absolute z-10 bottom-2 left-3 text-xl text-white">
                    <h1>Electronics</h1>
                </div>
            </div>
            <div className="grid3 relative"><img src={fashion} alt="fashion" className="w-full rounded-xl h-full object-contain"/>
            <div className="absolute z-10 bottom-10 left-3 max-md:left-28 text-xl text-white">
                    <h1>Fashion</h1>
                </div>
            </div>
            <div className="grid4 relative"><img src={grocery} alt="grocery" className="w-full rounded-xl h-full object-center"/>
            <div className="absolute z-10 bottom-2 left-3 text-xl text-white">
                    <h1>Grocery</h1>

                </div>
            </div>
        </div>
    )
}
export default Menus