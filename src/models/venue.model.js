import { DataTypes, Model } from "sequelize";

import sequelize from "../lib//sequelize.js";

class Venue extends Model {
//   static associate(models) {
//     Venue.belongsTo(models.event, {
//       foreignKey: "eventId",
//       as: "event",
//     });
//   }
}

Venue.init(
  {
    id: { type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4,primaryKey:true},
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    zip: { type: DataTypes.STRING },
    capacity: { type: DataTypes.INTEGER },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: { model: "events", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "Venue",
    tableName: "venues",
  }
);

export default Venue;
