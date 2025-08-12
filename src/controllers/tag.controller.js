import { db } from "../models/index.js";
import ApiResponse from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";

export const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return ApiResponse.error(res, "Tag name not found", 404);
    }

    const tag = await db.Tag.create({ name });
    return ApiResponse.success(res, tag, "Tag Created Successfully");
  } catch (error) {
    logger.error("error creating tag", error);
    return ApiResponse.error(res, error);
  }
};
export const getAllTags = async(req ,res)=>{
    try {
        const allTag = await db.Tag.findAll();
        return ApiResponse.success(res,allTag,"All Tags fetched successfully");
    } catch (error) {
        logger.error("error fetching tags", error);
        return ApiResponse.error(res, error);
    }
}


