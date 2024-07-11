const User = require("../models/user.models");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { firstName, lastName, birthday, email, phonenumber, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      birthday,
      email,
      phonenumber,
      password: hashedPassword,
    });

    return res.status(201).json(newUser);
  } catch (err) {
    console.error("Error during user creation:", err.message);
    return res.status(500).json({
      error: "An error occurred while creating the user",
      details: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, phonenumber, password } = req.body;

  try {
    let user;
    if (email) {
      user = await User.findOne({ where: { email: email } });
    } else if (phonenumber) {
      user = await User.findOne({ where: { phonenumber: phonenumber } });
    }

    if (!user) {
      return res.status(400).json({ error: "User or password incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Error during login:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

exports.findAllUsers = async (req, res) => {
  try {
    const data = await User.findAndCountAll();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Failed to find users:", err);
    return res.status(500).json({ error: "Failed to find users" });
  }
};

exports.findOneUser = async (req, res) => {
  const { id } = req.params; 

  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Failed to find user:", err);
    return res.status(500).json({ error: "Failed to find user" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await User.destroy({ where: { id: id } });
    if (result === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Failed to delete user:", err);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, birthday, email, phonenumber, password } = req.body;

  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      birthday: birthday || user.birthday,
      email: email || user.email,
      phonenumber: phonenumber || user.phonenumber,
      password: password ? await bcrypt.hash(password, 10) : user.password,
    };

    await user.update(updatedUser);

    return res.status(200).json(user);
  } catch (err) {
    console.error("Failed to update user:", err);
    return res.status(500).json({ error: "Failed to update user" });
  }
};
