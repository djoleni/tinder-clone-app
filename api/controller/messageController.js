import Message from "../models/Message.js";

export const sendMessage = async(req,res)=>{
    try{
        const {content, receiverId} = req.body;

        const newMessage = await Message.create({
            sender: req.user._id,
            receiver: receiverId,
            content
        })

        //TODO THE MESSAGE IN REAL TIME -> SOCKET.IO

        res.status(201).json({succes:true, message:newMessage})

    } catch(error){
        console.log("Error in sendMessage controller:", error);
        res.status(500).json({success:false, message:"Internal server error"})
    }


}
export const getConversation = async(req,res)=>{

    try{
        const {userId} = req.params;

        const messages = await Message.find({
            $or: [
               {sender: req.user._id, receiver: userId},
               {sender: userId, receiver: req.user._id}
            ]
        }).sort("createdAt");

        res.status(200).json({
            success:true,
            messages
        })
        
    } catch(error){
        console.log("Error in getConversation controller", error);
        res.status(500).json({message:"Internal server error"})
  
    }


}