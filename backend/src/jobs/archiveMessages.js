const cron = require("node-cron");
const { Op } = require("sequelize");
const { Message, ArchivedMessage, sequelize } = require("../models");

const archiveOldMessages = () => {
  // Run every day at 2 AM
  cron.schedule("0 2 * * *", async () => {
    
    console.log("Starting archive job...");

    const transaction = await sequelize.transaction();

    try {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      // 1️⃣ Get old messages
      const oldMessages = await Message.findAll({
        where: {
          createdAt: {
            [Op.lt]: oneDayAgo,
          },
        },
        transaction,
      });

      if (oldMessages.length === 0) {
        console.log("No messages to archive.");
        await transaction.commit();
        return;
      }

      // 2️⃣ Bulk insert into archive table
      await ArchivedMessage.bulkCreate(
        oldMessages.map(msg => msg.toJSON()),
        { transaction }
      );

      // 3️⃣ Delete from main table
      await Message.destroy({
        where: {
          createdAt: {
            [Op.lt]: oneDayAgo,
          },
        },
        transaction,
      });

      await transaction.commit();

      console.log(`Archived ${oldMessages.length} messages successfully.`);
    } catch (error) {
      await transaction.rollback();
      console.error("Archive job failed:", error);
    }
  });
};

module.exports = archiveOldMessages;
