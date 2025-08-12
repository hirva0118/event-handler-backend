import { DataTypes, INTEGER, Model } from "sequelize";
import sequelize from "../lib/sequelize.js";

class Event extends Model {
  //   static associate(models) {
  //     Event.belongsTo(models.user, {
  //       foreignKey: "userId",
  //       as: "user",
  //     });
  //     Event.hasOne(models.venue,{
  //         foreignKey:"eventId",
  //         as:"venue"
  //     })
  //   }
}

Event.init(
  {
    id: { type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    totalTickets: { type: DataTypes.INTEGER, allowNull: false },
    availableTickets:{type:DataTypes.INTEGER,allowNull:false},
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "Event",
    tableName: "events",
  }
);

export default Event;
