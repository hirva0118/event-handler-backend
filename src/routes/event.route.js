import express from "express";
import { CreateEvent, getAllEvent, getEventById, getEventByUser } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/create-event",CreateEvent);
router.get("/get-all-events", getAllEvent);
router.get("/get-user-event/:userId", getEventByUser);
router.get("/get-event-by-id/:id", getEventById);

export default router;
