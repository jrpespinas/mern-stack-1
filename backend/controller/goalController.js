/**
 * Displays all recorded goals.
 *
 * @access private
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const getGoals = (req, res) => {
  res.status(200).json({ message: "Get goals from controller" });
};

/**
 * Creates a goal.
 *
 * @access private
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const setGoals = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.status(200).json({ message: "Set goals from controller" });
};

/**
 * Updates a goal given an id.
 *
 * @access private
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const putGoal = (req, res) => {
  res.status(200).json({
    message: `Update goal ${req.params.id} from controller`,
  });
};

/**
 * Deletes a goal given an id.
 *
 * @access private
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const deleteGoal = (req, res) => {
  res.status(200).json({
    message: `Update goal ${req.params.id} from controller`,
  });
};

module.exports = {
  getGoals,
  setGoals,
  putGoal,
  deleteGoal,
};
