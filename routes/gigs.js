const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Product = require('../models/Product');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get gig list
router.get('/', (req, res) => 
  Gig.findAll()
    .then(gigs => res.render('gigs', {
        gigs
      }))
    .catch(err => console.log(err)));

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

//Display add product form
router.get('/add-product', (req, res) => res.render('add-product'));

// Add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if(!title) {
    errors.push({ text: 'Please add a title' });
  }
  if(!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if(!description) {
    errors.push({ text: 'Please add a description' });
  }
  if(!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      title, 
      technologies, 
      budget, 
      description, 
      contact_email
    });
  } else {
    if(!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    // Insert into table
    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => console.log(err));
  }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => console.log(err));
});


// Add a product
router.post("/add-product", (req, res) => {
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
      .then(product => res.redirect("/gigs"))
      .catch(err => console.log(err));
  }
});
module.exports = router;