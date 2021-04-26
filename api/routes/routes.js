const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
const CompanyController = require("../controllers/companyController");
const ProductController = require("../controllers/productController");
const RoleController = require("../controllers/roleController");
const SubscriptionController = require("../controllers/subscriptionController");


// Auth
router.post("/api/auth/register", AuthController.validate("register"), AuthController.register);
router.post('/api/auth/login', AuthController.validate("login"), AuthController.login);

// Companies
router.post('/api/companies', CompanyController.createCompany);
router.get('/api/companies/:id', CompanyController.getById);
router.get('/api/companies', CompanyController.getAll);

// Products
router.get('/api/products/:id', ProductController.getById); // not working yet
router.get('/api/products', ProductController.getAll);

// Roles
router.post('/api/roles', RoleController.addRole);
router.get('/api/roles/:id', RoleController.getById);
router.get('/api/roles', RoleController.getAll);

// Subscriptions
router.post('/api/subscriptions', SubscriptionController.addSubscriptionPlan);
router.get('/api/subscriptions', SubscriptionController.getAll);
router.get('/api/subscriptions/name/:name', SubscriptionController.getByName);
router.get('/api/subscriptions/:id', SubscriptionController.getById);


module.exports = router;