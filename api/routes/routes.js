const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
const MemberController = require("../controllers/memberController");
const UserController = require("../controllers/userController");
const CompanyController = require("../controllers/companyController");
const ProductController = require("../controllers/productController");
const InventoryController = require("../controllers/inventoryController");
const RoleController = require("../controllers/roleController");
const SubscriptionController = require("../controllers/subscriptionController");
const CategoryController = require("../controllers/categoryController");

// Auth
router.post("/api/auth/register", AuthController.validate("register"), AuthController.register);
router.post('/api/auth/login', AuthController.validate("login"), AuthController.login);

// Member
router.post('/api/members', MemberController.validate("addMember"), MemberController.addMemeber);
router.get('/api/members/:id', MemberController.validate("getById"), MemberController.getById);
router.get('/api/members', MemberController.searchMembers);

// User
router.get('/api/users/:id', UserController.validate("getById"), UserController.getById);
router.get('/api/users/email/:email', UserController.validate("getByEmail"), UserController.getByEmail);
router.get('/api/users', UserController.searchUsers);

// Companies
router.post('/api/companies', CompanyController.validate('createCompany'), CompanyController.createCompany);
router.get('/api/companies/:id', CompanyController.validate('getById'), CompanyController.getById);
router.get('/api/companies', CompanyController.getAll);

// Products
router.get('/api/products/:id', ProductController.validate('getById'), ProductController.getById); // not working yet
router.get('/api/products', ProductController.getAll);
router.post('/api/products', ProductController.validate('createProduct'), ProductController.createProduct);

// Inventory
router.get('/api/inventories', InventoryController.searchInventory);
router.get('/api/inventories/:id', InventoryController.validate('getById'), InventoryController.getById);
router.post('/api/inventories', InventoryController.validate('addProduct'), InventoryController.addProduct);
router.delete('/api/inventories', InventoryController.validate('deleteProduct'), InventoryController.deleteProduct);


// Roles
router.post('/api/roles', RoleController.validate('addRole'), RoleController.addRole);
router.get('/api/roles/:id', RoleController.validate('getById'), RoleController.getById);
router.get('/api/roles', RoleController.getAll);

// Subscriptions
router.post('/api/subscriptions', SubscriptionController.validate('addSubscriptionPlan'), SubscriptionController.addSubscriptionPlan);
router.get('/api/subscriptions', SubscriptionController.getAll);
router.get('/api/subscriptions/name/:name', SubscriptionController.validate('getByName'), SubscriptionController.getByName);
router.get('/api/subscriptions/:id', SubscriptionController.validate('getById'), SubscriptionController.getById);

// Categories
router.post('/api/categories', CategoryController.validate('createCategory'), CategoryController.createCategory);
router.get('/api/categories/:id', CategoryController.validate('getCategoryById'), CategoryController.getCategoryById);
router.get('/api/categories', CategoryController.getAllCategories)

// Subcategories
router.post('/api/subcategories', CategoryController.validate('createSubcategory'), CategoryController.createSubcategory);
router.get('/api/subcategories/:id', CategoryController.validate('getSubcategoryById'), CategoryController.getSubcategoryById);
router.get('/api/subcategories', CategoryController.getAllSubcategories)

module.exports = router;