const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("login", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  timezone: "+07:00",
});

sequelize
  .sync()
  .then(() => {
    console.log("Tables created successfully");
  })
  .catch((err) => {
    console.error("Unable to create tables: ", err);
  });

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database: ", err);
  });

module.exports = sequelize;
