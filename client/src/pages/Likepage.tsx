import { CardPages } from "../components";
const LikePage =()=>{
    return(
        <div className="max-md:py-12 p-2">
             <CardPages query="https://mpfserver.vercel.app/api/v1/user/getLikeItem" />
        </div>
       
    )
}
export default LikePage
