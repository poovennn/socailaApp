const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const userAuth = require("./routes/auth");
const userPost = require("./routes/post");

const app = express();
dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongoose");
  }
);

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", userAuth);
app.use("/api/post", userPost);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("backend end is ready");
});
