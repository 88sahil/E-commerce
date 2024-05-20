


const GloballErrorHandle=(err,req,res,next)=>{
    err.statuscode = err.statuscode || 400
    err.status = err.status || 500
    if(process.env.NODE_ENV ==="developer"){
        res.status(err.statuscode).json({
            status:err.status,
            err
        })
    }
}

module.exports = GloballErrorHandle