import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js';
import { createRoom,updateRoom , deleteRoom, getRoom, getRooms} from '../controllers/room.js';


const router = express.Router();


//Create
router.post("/:hotelid",verifyAdmin, createRoom);

// Update

router.put("/:id",verifyAdmin, updateRoom)


//Delete

router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)

//Get 
router.get("/:id",verifyAdmin, getRoom)

//GetAll
router.get("/",verifyAdmin ,getRooms)


export default router