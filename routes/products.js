const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Product = require("../models/Product");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get product list
router.get("/", (req, res) =>
  Product.findAll()
    .then(products =>
      res.render("products", {
        products
      })
    )
    .catch(err => console.log(err))
);

// Display add product form
router.get("/add", (req, res) => res.render("add"));

// Add a product
router.post("/add", (req, res) => {
  let { name, minL, minW, minT } = req.body;
  let errors = [];

  // Validate Fields
  if (!name) {
    errors.push({ text: "Please add a product name" });
  }
  if (!minL) {
    errors.push({ text: "Please add a minimum Length" });
  }
  if (!minW) {
    errors.push({ text: "Please add a minimum Width" });
  }
  if (!minT) {
    errors.push({ text: "Please add a minimum Thickness" });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      name,
      minL,
      minW,
      minT
    });
  } else {
    if (!name) {
      name = "Product1";
    } 

    

    // Insert into table
    Product.create({
      name,
      minL,
      minW,
      minT
    })
      .then(product => res.redirect("/products"))
      .catch(err => console.log(err));
  }
});

// Search for products
router.get("/search", (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Product.findAll({ where: { name: { [Op.like]: "%" + term + "%" } } })
    .then(products => res.render("products", { products }))
    .catch(err => console.log(err));
});

module.exports = router;
