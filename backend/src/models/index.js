const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/database").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, DataTypes);

module.exports = db;
