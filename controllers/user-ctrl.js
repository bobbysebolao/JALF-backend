const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET = process.env.JWT_SECRET;

createUser = (req, res) => {
  const body = req.body;
  // throw an error if there is no body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a user",
    });
  }

  //hash the password
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(body.password, salt))
    // change the body password to the hash and use it to create a user
    .then((hash) => {
      body.password = hash;
      const user = new User(body);
      // throw an error if unable to create a user (user-model doesn't exist)
      if (!user) {
        return res.status(400).json({ success: false, error: err });
      }

      // new user successfully created, save it to the database
      user
        .save()
        .then(() => {
          const token = jwt.sign({ user: user.email }, SECRET, {
            expiresIn: "1h",
          });
          return res.status(201).json({
            success: true,
            token: token,
            message: "User created!",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            message: "User not created!",
          });
        });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "User not created!",
      });
    });
};

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    user.name = body.name;
    user.time = body.time;
    user.email = body.email;
    user.glucose_reading.push(body.glucose_reading);
    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (user && bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ user: user.email }, SECRET, { expiresIn: "1h" });
    return res.status(200).json({ success: true, token: token });
  }
};

// getUsers = async (req, res) => {
//     await User.find({}, (err, users) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }
//         if (!users.length) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `User not found` })
//         }
//         return res.status(200).json({ success: true, data: users })
//     }).catch(err => console.log(err))
// }

module.exports = {
  loginUser,
  createUser,
  updateUser,
  deleteUser,
  // getUsers,
  getUserById,
};
