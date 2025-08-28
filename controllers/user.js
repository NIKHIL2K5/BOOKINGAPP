import User from "../models/User.js";
export const createUser = async(request,response,next)=>{
     const newUser = new User((request.body))
        try {
            const savedUser = await newUser.save();
            response.status(200).json(savedUser)
    
        } catch (err) {
            next(err)
        }   
}
    export const updateUser = async(request,response,next)=>{
     try {
             const updatedUser = await User.findByIdAndUpdate(request.params.id, { $set: request.body }, { new: true });
             response.status(200).json(updatedUser)
         } catch (err) {
             next(err) 
         }  
    }
    export const deleteUser = async(request,response,next)=>{
     try {
             await User.findByIdAndDelete(request.params.id);
             response.status(200).json("User has been deleted")
         } catch (err) {
            next(err)
         }  
    }
    export const getUser = async(request,response,next)=>{
     try {
             const getUser = await User.findById(request.params.id);
             response.status(200).json(getUser)
     
         } catch (err) {
             next(err)
         }  
    }
     export const getAllUser = async(request,response,next)=>{
     try {
             const getAllUsers = await User.find();
             response.status(200).json(getAllUsers)
     
         } catch (err) {
             next(err)
         }    
    }