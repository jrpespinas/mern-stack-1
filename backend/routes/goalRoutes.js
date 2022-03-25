const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  putGoal,
  deleteGoal,
} = require("../controller/goalController");

router.get("/", getGoals);
router.post("/", setGoals);
router.put("/:id", putGoal);
router.delete("/:id", deleteGoal);

module.exports = router;
