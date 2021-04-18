const { Router } = require('express')
const router = Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id productImage categoryId description") // Select only listed fields
    .exec()
    .then((data) => {
      const result = {
        count: data.length,
        products: data.map((d) => {
          return {
            _id: d._id,
            name: d.name,
            price: d.price,
            description: d.description,
          };
        }),
      };
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
