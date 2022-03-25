const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  putGoal,
  deleteGoal,
} = require("../controller/goalController");

router.route("/").get(getGoals).post(setGoals);
router.route("/:id").put(putGoal).delete(deleteGoal);

module.exports = router;
