const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;

const app = express();

app.get("/api/goals", (request, response) => {
  response.status(200).json({
    message: "Get goals",
  });
});
app.listen(port, () => console.log(`Server started at ${port}`));
