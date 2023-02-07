// This file will contain all the routes for legos.

const express = require("express");
const Lego = require("../model/Lego");

const router = express.Router();

// Get all the legos:
router.get("/", (req, res) => {
  // find() - is a mongoDB command to get all objects:
  Lego.find({}).exec((err, legos) => {
    if (err) console.log(err.message);
    else res.json(legos);
  });
});

// POST - Add a new lego set:
router.post("/add", (req, res) => {
  let newLego = new Lego();
  newLego.id = req.body.id;
  newLego.year = req.body.year;
  newLego.amountOfBricks = req.body.amountOfBricks;
  newLego.price = req.body.price;

  newLego.save((err, lego) => {
    if (err) {
      res.status(404);
      res.send("Failed saving...");
    } else {
      res.status(201);
      res.send("New lego was added successfully");
    }
  });
});

// PUT - update a specific lego price:
router.put("/update/:id", (req, res) => {
  Lego.findOneAndUpdate(
    { id: req.params.id },
    { $set: { price: req.body.newprice } },
    (err, updateLego) => {
      if (err) {
        res.status(404);
        res.send(`Failed updating the new price for the lego ...`);
      } else {
        res.status(200);
        res.send(`The new price for the lego was updated successfully`);
      }
    }
  );
});

// DELETE- delete lego by id:
router.delete("/delete/:id", (req, res) => {
  Lego.deleteOne({ id: req.params.id }).exec((err, lego) => {
    if (err) {
      res.status(404);
      res.send("Failed deleteing lego");
    } else {
      res.status(200);
      res.json(`Lego was deleted successfully`);
    }
  });
});

module.exports = router;
