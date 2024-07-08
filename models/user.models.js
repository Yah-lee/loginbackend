const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  }, // first_name
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  }, // last_name
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  emailandphonenumer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
