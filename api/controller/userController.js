import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js"

export const updateProfile = async (req,res) => {
    try{
        const {image, ...otherData} = req.body;
        const userId = req.user._id; //iz protectRoute middleware-a

        let updatedData = otherData;

        if(image){
            //base64 format
            if(image.startsWith("data:image")){
                try{
                    const uploadResponse = await cloudinary.uploader.upload(image);
                    updatedData.image = uploadResponse.secure_url
                } catch(error){
                    return res.status(400).json({
                        success:false,
                        message:"Error uploading image. Profile update aborted"
                    })
                }

            }
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}) //new:true vraca korisnika sa apdejtovanim podacima
        
        res.status(200).json({success:true, user:updatedUser});

    } catch(error){
        console.log("Error in updateProfile controller", error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
}