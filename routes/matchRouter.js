const express = require("express");
const { getMatches, getTodayMatches } = require("../controllers/matchController");

const router = express.Router();

router.get("/matches", getMatches);

module.exports = router;
