import { db } from "../models/index.js";
import ApiResponse from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";

export const AddVenue = async(req,res) => {
    const {address,city,zip,capacity,eventId} = req.body;
    try {
        if(!address || !city || !eventId){
            return ApiResponse.error(res,"All fields are required",400)
        }

        const venue = await db.Venue.create({address,city,zip,capacity,eventId});

        return ApiResponse.success(res,venue,"Venue added successfully")

    } catch (error) {
        logger.error("error adding venue", error);
        return ApiResponse.error(res, error);
    }
}
