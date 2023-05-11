import express from "express";
import Hotel from "../models/Hotel.js";
// import { createError } from "./error.js"
import {
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
  createHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();


//CREATE
router.post("/", verifyAdmin, createHotel);
//UPDATE
router.put("/:id",verifyAdmin,  updateHotel);
//DELETE
router.delete("/:id",verifyAdmin,  deleteHotel);
//GET
router.get("/:id", getHotel);
//GET ALL
router.get("/", getHotels);
export default router;
