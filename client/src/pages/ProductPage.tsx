import { Product } from "../components";
import { useParams } from "react-router-dom";
const ProductPage =()=>{
    const {id} = useParams<string>();
    return(
        <Product id={id}/>
    )
}
export default ProductPage