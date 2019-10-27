const Sequelize = require("sequelize");
const db = require("../config/database");

const Product = db.define(
  "product",
  {
    Name: Sequelize.STRING
  },
  {
    MinL: Sequelize.STRING
  },
  {
    MinW: Sequelize.STRING
  },

  {
    MinT: Sequelize.STRING
  },
  
  { timestamps: false }
);

module.exports = Product;
