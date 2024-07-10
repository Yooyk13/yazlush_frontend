const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/router");
const app = express();
const https = require("https");
const fs = require("fs");

// Define CORS options
// const corsOptions = {
//   origin: "https://blogshh.netlify.app",
//   optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api", router);

// db connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => console.log("db connection successfull"))
  .catch((err) => {
    console.log(err);
  });

const Port = process.env.PORT || 9000;
// let server;

// server = https.createServer(app);

app.listen(Port, () => console.log(`server is listening at port ${Port}`));
