const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`email: ${email}, pass: ${password}`);
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.getUserId = async () => {
//   try {
//     const response = await axios.get("https://api.medium.com/v1/me", {
//       headers: {
//         Authorization: `Bearer ${process.env.MEDIUM_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const userId = response.data.data.id;
//     console.log("Medium User ID:", userId);
//     return userId;
//   } catch (error) {
//     console.error(
//       "Error getting Medium User ID:",
//       error.response ? error.response.data : error.message
//     );
//     throw new Error("Failed to get Medium User ID");
//   }
// };
