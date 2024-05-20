
const GloballErrorHandle=(err,req,res,next)=>{
    err.statuscode = err.statuscode || 400
    err.status = err.status || 'fail'
    res.status(err.statuscode).json({
        status:err.status,
        err:err.message,
        stack:err.stack
    })
}

module.exports = GloballErrorHandle