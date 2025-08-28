import Hotel from "../models/Hotel.js";
export const createHotel = async(request,response,next)=>{
     const newHotel = new Hotel((request.body))
        try {
            const savedHotel = await newHotel.save();
            response.status(200).json(savedHotel)
    
        } catch (err) {
            next(err)
        }   
}
    export const updateHotel = async(request,response,next)=>{
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      request.params.id, 
      { $set: request.body }, 
      { new: true }
    );
    if (!updatedHotel) {
      return response.status(404).json("Hotel not found");
    }
    response.status(200).json(updatedHotel);
  } catch (err) {
    next(err); 
  }
};

    export const deleteHotel = async(request,response,next)=>{
     try {
             await Hotel.findByIdAndDelete(request.params.id);
             response.status(200).json("Hotel has been deleted")
         } catch (err) {
            next(err)
         }  
    }
    export const getHotel = async(request,response,next)=>{
     try {
             const getHotel = await Hotel.findById(request.params.id);
             response.status(200).json(getHotel)
     
         } catch (err) {
             next(err)
         }  
    }
     export const getHotels = async(request,response,next)=>{
     try {
             const getAllHotels = await Hotel.find();
             response.status(200).json(getAllHotels)
     
         } catch (err) {
             next(err)
         }    
    }
    export const countByCity = async(request,response,next)=>{
    const cities=request.query.cities.split(",")
     try {
             const list=await Promise.all(cities.map(city=>{
                return Hotel.countDocuments({city:city}) 
             }))
             response.status(200).json(list)
     
         } catch (err) {
             next(err)
         }    
    }
    export const countByType = async(request,response,next)=>{
        
        try {
            const hotelCount=await Hotel.countDocuments({type:"hotel"})
            const apartmentCount= await Hotel.countDocuments({type:"apartment"})
            const resortCount= await Hotel.countDocuments({type:"resort"})
            const villaCount= await Hotel.countDocuments({type:"villa"})
            const cabinCount= await Hotel.countDocuments({type:"cabin"})
            response.status(200).json([{type:"hotel",count : hotelCount},{type:"apartment",count : apartmentCount},{type:"resort",count : resortCount},{type:"cabin",count : cabinCount},{type:"villa",count: villaCount}])
     
         } catch (err) {
             next(err)
         }    
    }