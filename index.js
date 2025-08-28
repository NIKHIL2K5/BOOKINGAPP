import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import authenticationRoute from '../api/routes/auth.js'
import hotelsRoute from '../api/routes/hotels.js'
import roomsRoute from '../api/routes/rooms.js'
import usersRoute from '../api/routes/users.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app=express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDb")
    } catch (error) {
        throw error
    }  
};

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDb disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("MongoDb connected")
})



//middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authenticationRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/users",usersRoute)

app.use((error,request,response,next) =>{
    const errorStatus = error.status || 500
    const errorMessage= error.message || "Something Went Wrong!"
    return response.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:  error.stack,
    })
})

app.listen(8800, ()=>{
    connect(); 
    console.log("Connected to BackEnd")
}) 