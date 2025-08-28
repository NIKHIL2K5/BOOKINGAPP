import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isAdmin: false  
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async(request,response,next)=>{
    try{
        const user= await User.findOne({username:request.body.username})
        if (!user)  return next(createError(404,"User Not Found!")) 
        
        const isPasswordCorrect = await bcrypt.compare(request.body.password,user.password)
        
        if(!isPasswordCorrect) 
            return next(createError(400,"Wrong Password or Wrong User Name"))

        const token =jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT_SECRET)



        const {password,isAdmin,...otherDetails} = user._doc
        response.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).json({...otherDetails})

    }catch(error){
        next(error)
    } 
}