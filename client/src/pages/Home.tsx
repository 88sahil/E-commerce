import {ImageSlider,Menus,CardPages,Features} from '../components/index'
import img1 from '../assets/image/3990137.jpg'
import img2 from '.././assets/image/img2.png'
import img3 from '.././assets/image/8508102.jpg'
import img4 from '.././assets/image/5742697.jpg'
const Home =()=>{
    let Images = [img1,img2,img3,img4];
   
    return(
        <div>
            <ImageSlider images={Images} />
            <Menus/>
            <h1 className="text-center font-extrabold text-3xl">Items In Store</h1>
            <CardPages query={"https://mpfserver.vercel.app/api/v1/item/getAllitems?fields=_id,price,title,coverphoto,discount&limit=10&page=1"} />
            <Features />
        </div>
    )
}
export default Home;
