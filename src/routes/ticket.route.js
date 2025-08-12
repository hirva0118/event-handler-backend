import express from "express";
import { buyTicket, getAllTickets, getTicketByEventId } from "../controllers/ticket.controller.js";

const router = express.Router();

router.post("/buy-ticket", buyTicket);
router.get("/get-all-ticket", getAllTickets);
router.get("/get-ticket-by-event/:eventId", getTicketByEventId);

export default router;
