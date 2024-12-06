const cloudinary = require ('cloudinary').v2




    // Configuration
   
cloudinary.config({ 
    cloud_name: 'dkv0isrrg', 
    api_key: '948773496146836', 
    api_secret: 'w0FfFpMlUY-JKKcN4OxUROxPd2o' // Click 'View API Keys' above to copy your API secret
});

const uploadfile = async(filepath)=>{
    try { const  result = await cloudinary.uploader.upload("https://graphicsfamily.com/wp-content/uploads/2020/11/Professional-Luxury-Logo-Design-on-realistic-leather-2048x1152.jpg")
        console.log(result)
        return result
        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = uploadfile ;




