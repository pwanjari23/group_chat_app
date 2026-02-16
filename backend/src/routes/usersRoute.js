const express = require("express");
const router = express.Router();

// Mock user data
let users = [
  { id: "1", name: "PatCooper", email: "pat@example.com" },
  { id: "2", name: "Judith Tung", email: "judith@example.com" },
  { id: "3", name: "Darrell Mckinney", email: "darrell@example.com" },
];

// GET all users (optionally filter by search)
router.get("/", (req, res) => {
  const search = req.query.search || "";
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
  res.json(filteredUsers);
});

// GET user by email
router.get("/email/:email", (req, res) => {
  const user = users.find((u) => u.email === req.params.email);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

module.exports = router;
