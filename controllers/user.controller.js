const { DataTypes, where } = require("sequelize");
const User = require("../models/user.models");
const { error } = require("console");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { emailandphonenumer, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      emailandphonenumer: emailandphonenumer,
      password: hashedPassword,
    });

    return res.status(201).json(newUser);
  } catch (err) {
    console.error("Error during user creation:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

exports.login = async (req, res) => {
  const { emailandphonenumer, password } = req.body;

  try {
    console.log("Received login request for:", emailandphonenumer);

    const user = await User.findOne({
      where: {
        emailandphonenumer: emailandphonenumer,
      },
    });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "User or password incorrect" });
    }

    console.log("User found:", user.emailandphonenumer);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log("Password is valid");

    return res.status(200).json(user);
  } catch (err) {
    console.error("Error during login:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

exports.findAllUsers = async (req, res) => {
  User.findAndCountAll()
    .then((data) => {
      return res.status(200).json(data);
      if (data.length === 0) {
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Failed to find user" });
    });
};
