const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db/connection");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userRouter);

app.listen(process.env.PORT || apiPort, () =>
  console.log(`Server running on port ${apiPort}`)
);

// check port
