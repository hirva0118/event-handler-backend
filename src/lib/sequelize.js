import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false,
  });
  
// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connection established successfully.");
  })
  .catch((error) => {
    console.error("❌ Unable to connect to the database:", error);
  });

sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("❌ Error synchronizing the database:", error);
  });

export default sequelize;
