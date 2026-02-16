const express = require("express");
const router = express.Router();

// Mock groups
let groups = [
  { id: "g1", name: "Project Alpha" },
  { id: "g2", name: "Friends" },
  { id: "g3", name: "Family" },
];

// GET all groups
router.get("/", (req, res) => {
  res.json(groups);
});

module.exports = router;
