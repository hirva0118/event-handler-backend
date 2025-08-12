import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../lib/sequelize.js";

class User extends Model {
  // static associate(models){
  //   User.hasMany(models.event,{
  //     foreignKey:"userId",
  //     as:"events",
  //   })
  // }
}

User.init(
  {
    id: { type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password:{type:DataTypes.STRING,allowNull:false},
    isAdmin:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
