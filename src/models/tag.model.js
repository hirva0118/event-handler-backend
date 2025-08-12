import { DataTypes, Model, UUID } from "sequelize";
import sequelize from "../lib/sequelize.js";

class Tag extends Model {}
Tag.init(
  {
    id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
    name: { type: DataTypes.STRING, allowNull: false },
    // eventId:{
    //     type:DataTypes.UUID,
    //     allowNull:false,
    //     references:{model:"events",key:"id"}
    // }
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tags",
  }
);

export default Tag;
