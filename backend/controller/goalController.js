const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal");

/**
 * Displays all recorded goals.
 *
 * @access private
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
});

/**
 * Creates a goal.
 *
 * @access private
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
  });

  res.status(200).json(goal);
});

/**
 * Updates a goal given an id.
 *
 * @access private
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

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

/**
 * Deletes a goal given an id.
 *
 * @access private
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

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  putGoal,
  deleteGoal,
};
