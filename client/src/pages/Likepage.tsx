import { CardPages } from "../components";
const LikePage =()=>{
    return(
        <CardPages query="/api/v1/user/getLikeItem" />
    )
}
export default LikePage