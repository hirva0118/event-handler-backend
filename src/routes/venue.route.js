
import express from "express";
import { AddVenue } from "../controllers/venue.controller.js";

const router = express.Router();

router.post("/add-venue",AddVenue);


export default router;
