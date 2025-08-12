import { db } from "../models/index.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";

export const CreateEvent = async (req, res) => {
  const { title, description, date, price, totalTickets, userId ,tagId} = req.body;
  try {
    if (!title || !date || !userId || !price || !totalTickets) {
      return ApiResponse.error("All fields are required", 404);
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return ApiResponse.error(res, "User not found", 404);
    }
    if (!user.isAdmin) {
      return ApiResponse.error(
        res,
        "You are not authorized to create event",
        403
      );
    }
    const availableTickets = totalTickets;
    const event = await db.Event.create({
      title,
      description,
      date,
      price,
      totalTickets,
      availableTickets,
      userId,
    });
    if (Array.isArray(tagId) && tagId.length > 0) {
      await event.addTags(tagId);
    }

    return ApiResponse.success(res, event, "Event created successfully");
  } catch (error) {
    logger.error("error creating event", error);
    return ApiResponse.error(res, error);
  }
};

export const getAllEvent = async (req, res) => {
  try {
    const event = await db.Event.findAll({
      include: [
        {
          model: db.Venue,
        },
        {
          model: db.Tag,
          through: { attributes: [] },
          attributes: ["id", "name"],
        },
        {
          model: db.Ticket,
          attributes:["id","userId","quantity"]
        },
      ],
    });
    return ApiResponse.success(res, event, "Event fetched successfully");
  } catch (error) {
    logger.error("error fetching event", error);
    return ApiResponse.error(res, error);
  }
};

export const getEventByUser = async(req ,res)=>{
  const {userId} = req.params;
  try {
    const events = await db.Event.findAll({
      where: { userId },
      include: [
        {
          model: db.Venue,
        },
        {
          model: db.Tag,
          through: { attributes: [] },
          attributes: ["id", "name"],
        },
        {
          model: db.Ticket,
          attributes: ["id", "userId", "quantity"],
        },
      ],
    });
    return ApiResponse.success(res,events,"User Event fetched successfully")
  } catch (error) {
     logger.error("error fetching user event", error);
     return ApiResponse.error(res, error);
  }
}

export const getEventById = async(req ,res)=>{
  const {id} = req.params;
  try {
    const event = await db.Event.findByPk(id, {
      include: [
        {
          model: db.Venue,
        },
        {
          model: db.Tag,
          through: { attributes: [] },
          attributes: ["id", "name"],
        },
        {
          model: db.Ticket,
          attributes: ["id", "userId", "quantity"],
        },
      ],
    });
    return ApiResponse.success(res,event,"Event Fetched successfully")
  } catch (error) {
    logger.error("error fetching event", error);
    return ApiResponse.error(res, error);
  }
}
