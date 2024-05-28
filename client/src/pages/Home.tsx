import React from "react";
import {ImageSlider} from '../components/index'
import img1 from '../assets/image/Screenshot 2024-05-27 150914.png'
import img2 from '.././assets/image/img2.png'
import img3 from '.././assets/image/8508102.jpg'
import img4 from '.././assets/image/5742697.jpg'
const Home =()=>{
    let Images = [img1,img2,img3,img4];
    return(
        <div>
            <ImageSlider images={Images} />
        </div>
    )
}
export default Home;