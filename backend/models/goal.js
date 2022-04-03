const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a teext value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", Schema);
