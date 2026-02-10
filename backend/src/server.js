require("dotenv").config();
const app = require("./app");
const cors = require("cors");
app.use(cors());
const sequelize = require("./config/database");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log("✅ Database synced");
  } catch (err) {
    console.error("❌ DB sync failed:", err);
  }
}

syncDatabase();
