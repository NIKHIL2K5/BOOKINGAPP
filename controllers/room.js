import { request, response } from "express";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async(request,response,next) =>{
    const hotelId = request.params.hotelId;
    const newRoom = new Room(request.body)
    console.log(newRoom)
    try{
        const savedRoom=await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push:{rooms:savedRoom._id}})
        }catch(error){
            next(error)
        }
        response.status(200).json(savedRoom);
    }catch(error){
        next(error)
    }
}

export const updateRoom = async(request,response,next)=>{
     try {
             const updateRoom = await Room.findByIdAndUpdate(request.params.id, { $set: request.body }, { new: true });
             response.status(200).json(updateRoom)
         } catch (err) {
             next(err) 
         }  
    }
    
    export const deleteRoom = async(request,response,next)=>{
  const roomId = request.params.id;
  try {
    const deletedRoom = await Room.findByIdAndDelete(roomId);
    if (!deletedRoom) {
      return response.status(404).json("Room not found");
    }
    await Hotel.findOneAndUpdate(
      { rooms: roomId }, // Find the hotel that contains this room
      { $pull: { rooms: roomId } }
    );
    response.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};
    export const getRoom = async(request,response,next)=>{
     try {
             const getRoom = await Room.findById(request.params.id);
             response.status(200).json(getRoom)
     
         } catch (err) {
             next(err)
         }  
    }
     export const getRooms = async(request,response,next)=>{
     try {
             const getAllRooms = await Room.find();
             response.status(200).json(getAllRooms)
     
         } catch (err) {
             next(err)
         }    
    }
    