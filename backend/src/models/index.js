const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 🔥 Just require directly (NO invoking)
db.User = require("./user");
db.Message = require("./message");

// Associations
db.Message.belongsTo(db.User, { foreignKey: "senderId", as: "sender" });
db.Message.belongsTo(db.User, { foreignKey: "receiverId", as: "receiver" });

module.exports = db;
