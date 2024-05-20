class AppError extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode = statuscode || 400
        this.status= `${this.statuscode}`.startsWith('4') ? 'error' : 'fail'
        this.isOperational = false
        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports = AppError