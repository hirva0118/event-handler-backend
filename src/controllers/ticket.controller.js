import { db } from "../models/index.js";
import ApiResponse from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";

export const buyTicket = async (req, res) => {
  const { userId, eventId, quantity } = req.body;
  try {
    if (!userId || !eventId) {
      return ApiResponse.error(res, "All fields are required");
    }
    const user = await db.User.findByPk(userId);
    if (!user) {
      return ApiResponse.error(res, "User not found", 404);
    }
    const event = await db.Event.findByPk(eventId);
    if (!event) {
      return ApiResponse(res, "Event not found", 404);
    }
    if (event.availableTickets < quantity) {
      return ApiResponse(res, "Not enough tickets available", 400);
    }

    const ticket = await db.Ticket.create({ userId, eventId, quantity });

    event.availableTickets -= quantity;
    await event.save();

    return ApiResponse.success(res, ticket, "Ticket created successfully");
  } catch (error) {
    logger.error("error adding venue", error);
    return ApiResponse.error(res, error);
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const ticket = await db.Ticket.findAll();
    return ApiResponse.success(res, ticket, "Ticket fetched successfully");
  } catch (error) {
    logger.error("error fetching ticket", error);
    return ApiResponse.error(res, error);
  }
};

export const getTicketByEventId = async (req, res) => {
  const { eventId } = req.params;
  try {
    const ticket = await db.Ticket.findAll({
      where: { eventId },
      attributes: ["id", "userId", "quantity"]
    });
    return ApiResponse.success(res, ticket, "Ticket fethced successfully");
  } catch (error) {
    logger.error("error fetching ticket", error);
    return ApiResponse.error(res, error);
  }
};
