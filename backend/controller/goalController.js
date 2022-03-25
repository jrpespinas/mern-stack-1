/**
 * Display all recorded goals.
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const getGoals = (req, res) => {
  res.status(200).json({ message: "Get goals from controller" });
};

module.exports = {
  getGoals,
};
