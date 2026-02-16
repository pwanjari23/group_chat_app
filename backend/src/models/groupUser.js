const GroupUser = sequelize.define("GroupUser", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  groupId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = GroupUser;
