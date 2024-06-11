const SectionLabel =(props:{label:string})=>{
    return(
        <div className="py-5 flex w-full items-center">
            <div className="h-[2px] w-[40%] bg-gray-300"></div>
                <h1 className="text-xl w-[20%] max-md:w-[60%] font-bold italic text-gray-400">{props.label}</h1>
            <div className="h-[2px] w-[40%] bg-gray-300"></div>
        </div>
    )
}
export default SectionLabel