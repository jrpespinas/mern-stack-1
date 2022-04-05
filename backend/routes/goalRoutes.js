const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  putGoal,
  deleteGoal,
} = require("../controller/goalController");
const { protect } = require("../utils/auth");

router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").put(protect, putGoal).delete(protect, deleteGoal);

module.exports = router;
