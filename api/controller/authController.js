import User from '../models/User.js'
import jwt from 'jsonwebtoken';

const signToken = (id) => {

    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"})
}

export const signup = async(req,res)=>{
    const {email, name, password, age, gender, genderPreference} = req.body;

    try{
        if(!name || !email || !password || !age || !gender || !genderPreference){
            return res.status(400).json({
             success: false,
                 message: "All fields are required"
            })
          }
        
        if(age < 18){
            return res.status(400).json({
                 success: false,
                     message: "You must be at least 18 years old"
                })
            
            }
            
            
        if(password.length < 6){
            return res.status(400).json({
                 success: false,
                     message: "Password must be at least 6 characters"
                })
            }

        const newUser = await User.create({
            name,
            email,
            password,
            age,
            gender,
            genderPreference,
        })

        const token = signToken(newUser._id);

        res.cookie("jwt", token, {
            maxAge: 7*24*60*60*1000,
            httpOnly: true, //prevents XSS attacks
            sameSite: "strict", //prevents CSRF attacks
            secure: process.env.NODE_ENV === 'production' //http, https
        })


        res.status(201).json({
            success: true,
            user: newUser
        })

         
    } catch(error){
        console.log('Error in signup controller', error);
        res.status(500).json({success:false, message:"Internal server error"})
    }


    
}

export const login = async(req,res) =>{

    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Provide both email and password"
            })
        }

        const user = await User.findOne({email});

        if(!user || !(await user.matchPassword(password))){
    
            return res.status(401).json({success:false, message:"Incorrect email or password"})
        }

        const token = signToken(user._id);

        res.cookie("jwt", token, {
            maxAge: 7*24*60*60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production'
        })

        res.status(200).json({
            success:true,
            user
        })


    } catch(error){

        console.log("Error in login controller", error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
}

export const logout = async(req,res) => {

    try{
        res.clearCookie('jwt');
        res.status(200).json({success:true, message:"Logged out successfully"})

    } catch(error){
        console.log("Error in logout controller", error);
        res.status(500).json({success:false, message: "Internal server error"})
    }

}