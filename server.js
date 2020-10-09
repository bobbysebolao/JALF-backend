const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require('./routes/user-router')

const db = require("./db/connection");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// app.options('/api/*', cors());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!");
});

app.use("/api", userRouter);

const apiPort = 3000;

app.listen(process.env.PORT || apiPort, () =>
  console.log(`Server running on port ${apiPort}`)
);
