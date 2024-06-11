import './Footer.scss'
const Footer=()=>{
    return(
        <footer>
            <div className="grid1 items-start max-md:items-center">
                <h1 className="text-[45px] font-sans text-white font-extrabold ">
                    MPF.
                </h1>
                <p className="text-gray-100">copyright @2024 earth technologies<br />All reserverd</p>
            </div>
            <div className="grid2 items-start max-md:items-center">
                <h1 className="text-white text-3xl font-bold">company</h1>
                <a className="text-gray-100">About us</a>
                <a className="text-gray-100">Blog</a>
                <a className="text-gray-100">Jobs</a>
            </div>
            <div className="grid3 items-start max-md:items-center">
            <h1 className="text-white text-3xl font-bold">Support</h1>
                <a className="text-gray-100">Help center</a>
                <a className="text-gray-100">Terms and service</a>
                <a className="text-gray-100">Address</a>
            </div>
            <div className="grid4 items-start max-md:items-center">
                <h1 className="text-white text-3xl font-bold">Stay Up to Date</h1>
                <input type="email" placeholder="your email address" />
            </div>
        </footer>
    )
}
export default Footer