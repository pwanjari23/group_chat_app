const express = require("express");
const router = express.Router();
const { signup, login, getUserByEmail } = require("../controller/userController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", getUserByEmail);

module.exports = router;
