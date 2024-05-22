const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:process.env.cloudname,
    api_key:process.env.apikey,
    api_secret:process.env.apisecret
})

const cloudupload = async(file)=>{
    try{
        if(!file) return null;
        let response =  await cloudinary.uploader.upload(file,{
            folder:'Photos',
        })
        return response
    }catch(err){
        console.log(err)
    }
}
const clouddelete = async(fileId)=>{
    try{
        if(!fileId) return false;
        let response = await cloudinary.uploader.destroy(fileId)
        return true
    }catch(err){
        console.log(err)
    }
}

module.exports = {cloudupload,clouddelete}