import User from "../models/User.js"
import {getConnectedUsers, getIo} from '../socket/socket.server.js'

export const swipeRight = async(req,res) =>{

    try{
        const {likedUserId} = req.params;
        const likedUser = await User.findById(likedUserId);
        const currentUser = await User.findById(req.user._id);

        if(!likedUser){
            return res.status(404).json({success:false, message:"User not found"})
        }

        if(!currentUser.likes.includes(likedUserId)){
            
            currentUser.likes.push(likedUserId);
            await currentUser.save();
            
            if(likedUser.likes.includes(currentUser._id)){
                currentUser.matches.push(likedUserId);
                likedUser.matches.push(currentUser._id);
            

            await Promise.all([
                 currentUser.save(), likedUser.save()
            ])

            //send notification in real-time
            const connectedUsers = getConnectedUsers();
            const io = getIo();
            const likedUserSocketId = connectedUsers.get(likedUserId); 
            
            if(likedUserSocketId){
                io.to(likedUserSocketId).emit("newMatch", {
                    _id: currentUser._id,
                    name: currentUser.name,
                    image: currentUser.image,
                });
            }

            const currentUserSocketId = connectedUsers.get(currentUser._id.toString());
            if(currentUserSocketId){
                io.to(currentUserSocketId).emit("newMatch", {
                    _id: likedUser._id,
                    name: likedUser.name,
                    image: likedUser.image
                })
            }

         }

        }


        res.status(200).json({
            success:true,
            user: currentUser
        })

        
    } catch(error){
        console.log("Error in swipeRight controller", error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const swipeLeft = async(req,res) =>{
    try{
        const {dislikedUserId} = req.params;
        const currentUser = await User.findById(req.user._id);

        if(!currentUser.dislikes.includes(dislikedUserId)){
            currentUser.dislikes.push(dislikedUserId);
            await currentUser.save();
        }

        res.status(200).json({
            success:true,
            user:currentUser
        })


    } catch(error){
        console.log("Error in swipeLeft controller", error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const getMatches = async(req,res) =>{
    try{
        const user = await User.findById(req.user._id).populate("matches", "name image");

        res.status(200).json({
            success:true,
            matches: user.matches
        })

        
    } catch(error){
        console.log("Error in getMatches controller:",error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const getUserProfiles = async(req,res) =>{
    try{
        const currentUser = await User.findById(req.user._id);

        const users = await User.find({
            $and:[
                {_id: {$ne: currentUser._id}},
                {_id: {$nin: currentUser.likes}},
                {_id: {$nin: currentUser.dislikes}},
                {_id: {$nin: currentUser.matches}},
                {gender: currentUser.genderPreference === 'both' 
                        ? {$in: ['male', 'female']}
                        : currentUser.genderPreference
                },
                {genderPreference: {$in: ['both', currentUser.gender]}}
            ]
        })

        res.status(200).json({
            success:true,
            users
        })


    } catch(error){
        console.log("Error in getUserProfile controller: ", error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    } 
}