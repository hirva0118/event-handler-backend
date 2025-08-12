import User from "./user.model.js";
import Venue from "./venue.model.js"
import Event from "./event.model.js";
import Ticket from "./ticket.model.js";
import Tag from "./tag.model.js";

// 1:N
User.hasMany(Event,{foreignKey:"userId"}); 
Event.belongsTo(User,{foreignKey:"userId"});

//1:1
Event.hasOne(Venue, { foreignKey: "eventId" }); 
Venue.belongsTo(Event,{foreignKey:"eventId"});

//N:1
Ticket.belongsTo(Event,{foreignKey:"eventId"});
Event.hasMany(Ticket, { foreignKey: "eventId" });

//N:M
Event.belongsToMany(Tag,{through:"EventTags",foreignKey:"eventId",otherKey:"tagId"});
Tag.belongsToMany(Event, { through: "EventTags", foreignKey: "tagId",otherKey:"eventId" });

export const db = {
  Event,
  Venue,
  User,
  Ticket,
  Tag
};