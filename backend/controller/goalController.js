const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal");
const User = require("../models/user");

/**
 * Displays all recorded goals.
 *
 * @access private
 * @route GET /api/goals
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

/**
 * Creates a goal.
 *
 * @access private
 * @route POST /api/goals
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

/**
 * Updates a goal given an id.
 *
 * @access private
 * @route PUT /api/goals/id
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const putGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() != user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

/**
 * Deletes a goal given an id.
 *
 * @access private
 * @route DELETE /api/goals/id
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() != user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  putGoal,
  deleteGoal,
};
