require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// importing routes
const authRouters = require("./backend/routes/auth");
const userRouters = require("./backend/routes/user");
const categoryRouters = require("./backend/routes/category");
const productRouters = require("./backend/routes/product");
const orderRouters = require("./backend/routes/order");

// connecting DB
const app = express();
const port = 8000;
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};
mongoose
  .connect(process.env.DB_PATH, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api", authRouters);
app.use("/api", userRouters);
app.use("/api", categoryRouters);
app.use("/api", productRouters);
app.use("/api", orderRouters);

// starting server
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
