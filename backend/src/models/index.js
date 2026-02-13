const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user");
db.Message = require("./message");

db.Message.belongsTo(db.User, { foreignKey: "senderId", as: "sender" });
db.Message.belongsTo(db.User, { foreignKey: "receiverId", as: "receiver" });

module.exports = db;
