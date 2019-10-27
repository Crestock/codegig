const Sequelize = require("sequelize");
const db = require("../config/database");

const Gig = db.define(
  "gig",
  {
    title: Sequelize.STRING
  },
  {
    technologies: Sequelize.STRING
  },

  {
    description: Sequelize.STRING
  },
  {
    budget: Sequelize.STRING
  },
  {
    contact_email: Sequelize.STRING
  },
);

module.exports = Gig;
