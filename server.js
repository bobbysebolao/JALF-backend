const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require('./routes/user-router')

const db = require("./db/connection");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());

// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');

//   next();
// }

// app.use(allowCrossDomain)

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Method', 'PUT, GET, POST, OPTIONS');
//   next();
// });

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!");
});

app.use("/api", userRouter);

const apiPort = 3000;

app.listen(process.env.PORT || apiPort, () =>
  console.log(`Server running on port ${apiPort}`)
);
