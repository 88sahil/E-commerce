import { CardPages } from "../components";
const LikePage =()=>{
    return(
        <CardPages query="http://13.211.135.249:8000/api/v1/user/getLikeItem" />
    )
}
export default LikePage