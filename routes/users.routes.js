const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validate user input
    if (!(username && email && password)) {
      res.status(400).send("All input is required");
    }
    // check if user already exists
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email }).select("+password");

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    //     User.create({ username, email, password })
    //   .then((data) => {
    //     res.status(200).send(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(500).send("Something went wrong");
    //   });

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      username,
      email: email,
      password: encryptedPassword,
    });
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
     return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email }).select("+password");

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});
//GET Routes

// router.get("/", (req, res) => {
//     res.send("Welcome to Express");
//   });
router.get("/", (req, res) => {
  const { username, email, password } = req.body;

  User.find({})
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send("Something went wrong"));
});

module.exports = router;
