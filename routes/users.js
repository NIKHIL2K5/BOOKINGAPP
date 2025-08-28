import express, { request, response } from 'express'
import {createUser,updateUser,deleteUser,getAllUser,getUser} from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get("/checkauthentcation",verifyToken, (request,response,next)=>{
//         response.send("HEllo user, You are logged in")
// })

// router.get("/checkuser/:id",verifyUser, (request,response,next)=>{
//         response.send("HEllo user, You are logged in and you can do CRUD operations on your user profile")
// })

// router.get("/checkadmin/:id",verifyAdmin, (request,response,next)=>{
//         response.send("HEllo user, You are logged in and you can do CRUD operations on all users profile")
// })

//Create
router.post("/",createUser);

//Update
router.put("/:id",verifyUser, updateUser)

//Delete

router.delete("/:id",verifyUser,deleteUser)

//Get 
router.get("/:id",verifyUser, getUser)

//GetAll
router.get("/",verifyAdmin, getAllUser)


export default router