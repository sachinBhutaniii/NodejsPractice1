// for authentication routes

const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//express validator
const { check, validationResult } = require("express-validator");

// if person logged in is a user
router.get("/", (req, res) => {
  res.send("Welcome to User Dashboard");
});

router.post(
  "/register",
  [
    check("name", "Username is not valid")
      .not()
      .isEmpty()
      .withMessage("Name cannot be empty")
      .isLength({ min: 6, max: 255 })
      //.withMessage("Name should be of atleast 6 characters")
      .isAlpha(),
    //.withMessage("Name cannot have special character or number"),
    check("email", "Email is not valid")
      .not()
      .notEmpty()
      .isLength({ min: 6, max: 255 })
      .isEmail(),
    // .withMessage("Please enter correct email format"),
    check("password", "Password is not valid")
      .not()
      .isEmpty()
      .withMessage("Password cannot be empty")
      .isLength({ min: 6, max: 1024 }),
    //.withMessage("Password should be of atleast 6 characters"),
    check("role", "Enter a valid role").isLength({ max: 1, min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //   res.send("User Registered  ");
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()[0].msg,
      });
    }

    //checking if user already exists or not
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email Already Exists");

    //hashing the password
    //10 is the complixity of the generated string
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Creating a new user
    //const user = new User(req.body); this also works

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    });
    user
      .save()
      .then(result => res.send(result))
      .catch(err => res.status(404).send(err));
  }
);

router.post(
  "/login",
  [
    check("email", "Inavlid Email")
      .not()
      .notEmpty()
      .isLength({ min: 6, max: 255 })
      .isEmail(),
    check("password", "Inavlid Password")
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 1024 }),
  ],
  async (req, res) => {
    const errors1 = validationResult(req);
    //   res.send("User Registered  ");
    if (!errors1.isEmpty()) {
      return res.status(422).json({
        errors: errors1.array()[0].msg,
      });
    }
    // //checking if user already exists or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email Doesnt Exists");

    //if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    //res.send("Logged in Successfully");

    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    //adding token to the header
    res.header("auth-token", token).send(token);
  }
);

module.exports = router;
