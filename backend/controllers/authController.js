import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup
// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword
//   });

//   res.json(user);
// };

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created successfully"
    });

  } catch (error) {
    console.log("SIGNUP ERROR:", error); // 🔥 VERY IMPORTANT

    res.status(500).json({
      message: "Server error"
    });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token });
};