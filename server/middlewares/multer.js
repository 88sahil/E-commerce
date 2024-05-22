const multer = require('multer')
const storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const uploader =multer({
    storage
}).single('profile')
const multiuploader = multer({
    storage
}).array("photos",10)
module.exports ={uploader,multiuploader}