import express from "express";
import {createTag, getAllTags } from "../controllers/tag.controller.js";

const router = express.Router();

router.post("/create-tag",createTag);
router.get("/get-all-tags", getAllTags);

export default router;
