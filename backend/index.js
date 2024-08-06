const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

// routes
app.use("/api/user", require("./routes/userroute"));
app.use("/api/task", require("./routes/taskroute"));

mongoose
  .connect(process.env.MONGO_URI_ATLAS, {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port} And Database Connected`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
