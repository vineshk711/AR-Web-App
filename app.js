require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// importing routes
const authRouters = require("./projback/routes/auth");
const userRouters = require("./projback/routes/user");
const categoryRouters = require("./projback/routes/category");
const productRouters = require("./projback/routes/product");
const orderRouters = require("./projback/routes/order");

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
