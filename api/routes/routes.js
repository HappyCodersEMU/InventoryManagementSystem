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
router.post('/api/companies', CompanyController.validate('createCompany'), CompanyController.createCompany);
router.get('/api/companies/:id', CompanyController.validate('getById'), CompanyController.getById);
router.get('/api/companies', CompanyController.getAll);

// Products
router.get('/api/products/:id', ProductController.validate('getById'), ProductController.getById); // not working yet
router.get('/api/products', ProductController.getAll);
router.post('/api/products', ProductController.validate('createProduct'), ProductController.createProduct);

// Roles
router.post('/api/roles', RoleController.validate('addRole'), RoleController.addRole);
router.get('/api/roles/:id', RoleController.validate('getById'), RoleController.getById);
router.get('/api/roles', RoleController.getAll);

// Subscriptions
router.post('/api/subscriptions', SubscriptionController.validate('addSubscriptionPlan'), SubscriptionController.addSubscriptionPlan);
router.get('/api/subscriptions', SubscriptionController.getAll);
router.get('/api/subscriptions/name/:name', SubscriptionController.validate('getByName'), SubscriptionController.getByName);
router.get('/api/subscriptions/:id', SubscriptionController.validate('getById'), SubscriptionController.getById);


module.exports = router;