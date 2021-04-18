const express = require("express");
const app = express();
const morgan = require("morgan"); // Middleware for logs
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();


try {
  
  // Routes
  const productRoutes = require("./api/routes/products");


  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    () => { console.log('Mongoose connected') }
  );

  // Run logging middleware before other routes
  app.use(morgan("dev"));

  // CORS
  app.use((req, res, next) => {
    res.header("Access-Controll-Allow-Origin", "*"); // TODO: Do not allow all domains in production
    res.header(
      "Access-Controll-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Controll-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });

  // Routes which should handle requests
  app.use("/api/products", productRoutes);




  // Serve static assets if in production
  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }


  // Handle errors.
  // If the following line is reached, means no routes found
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

  module.exports = app;

} catch (e) {
  console.log("Server Error", e.message)
  process.exit(1)
}
