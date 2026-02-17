const express = require("express");
const router = express.Router();
const aiController = require("../controller/aiController");

router.post("/predict", aiController.predictText);
router.post("/smart-replies", aiController.smartReplies);

module.exports = router;
