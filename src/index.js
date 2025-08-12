import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import userRoutes from "./routes/user.route.js";
import eventRoutes from "./routes//event.route.js";
import venueRoute from "./routes/venue.route.js";
import ticketRoute from "./routes/ticket.route.js";
import TagRoute from "./routes/tag.route.js";

import logger from "./utils/logger.js";
import sequelize from './lib/sequelize.js';
// import Venue from "./models/venue.model.js";
// import User from "./models/user.model.js";
// import Event from "./models/event.model.js";

dotenv.config();

const app = express();
// ##SWAGGER##

app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests",
});
app.use(limiter);

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

sequelize.authenticate().then(() => console.log('Connected to DB'));

// const db = {
//   Event,
//   Venue,
//   User,
// };

// // Call associate methods to link models
// Object.values(db).forEach((model) => {
//   if (typeof model.associate === "function") {
//     model.associate(db);
//   }
// });

// export default db;

app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/venue",venueRoute);
app.use("/api/ticket",ticketRoute);
app.use("/api/tag",TagRoute)

app.get("/", (_req, res) => {
  res.send("API is running");
});

// ##ROUTES##

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  logger.info(`🚀 Server running at http://localhost:${PORT}`)
);
