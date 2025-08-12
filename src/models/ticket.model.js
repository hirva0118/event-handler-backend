import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize.js";


class Ticket extends Model{

}
Ticket.init(
  {
    id: { type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "events", key: "id" },
    },
    quantity:{type:DataTypes.INTEGER,defaultValue:1}
  },
  {
    sequelize,
    modelName: "Ticket",
    tableName: "tickets",
  }
);

export default Ticket;