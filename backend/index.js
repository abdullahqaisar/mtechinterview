const express = require("express");

const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

const authRoutes = require("./src/routes/auth.routes");

require("dotenv").config();

mongoose
  .connect(process.env.DATABASE_CONNECTION)
  .then(() => {
    console.log("Server is running on port " + process.env.PORT);
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
