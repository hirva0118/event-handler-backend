import { db } from "../models/index.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    if (!name || !email || !password) {
      return ApiResponse.error(res, "All fields are required", 404);
    }
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return ApiResponse.error(res, "User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });
    const { password: _, ...userWithoutPassword } = user.toJSON();

    return ApiResponse.success(
      res,
      userWithoutPassword,
      "User created successfully"
    );
  } catch (error) {
    logger.error("error creating user", error);
    return ApiResponse.error(res, error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await db.User.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: { model: db.Event },
    });
    return ApiResponse.success(res, user, "User fetched successfully");
  } catch (error) {
    logger.error("error fetching user", error);
    return ApiResponse.error(res, error);
  }
};
