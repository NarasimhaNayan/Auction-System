const router = require("express").Router();
const Product = require("../models/products");
const { ensureAuthenticated } = require("../config/auth");

const checkAuth = require("../middleware/check_auth");
const productController = require("../controllers/products");

// get request, getting all the Products in the database here
router.get("/", productController.getAllProducts);

// creating the route for the post
router.get(
    "/products/add-product",
    ensureAuthenticated,
    productController.getAddProduct
);

// post request, adding the data in the DB storage
router.post("/products/add-product", productController.addProducts);

// adding the comments in the single products
router.post(
    "/products/commentsAdded/:productID",
    ensureAuthenticated,
    productController.AddCommentsProduct
);

// get request for the single users only
router.get("/products/:productID", productController.getSingleProducts);

// get update request for the single users
router.get(
    "/products/edit-product/:productID",
    ensureAuthenticated,
    productController.getupdateProducts
);

// update request for the single users
router.post(
    "/productEdit/:productID",
    ensureAuthenticated,
    productController.updateProducts
);

// delete request for the single users
router.get(
    "/products/delete-product/:productID",
    ensureAuthenticated,
    productController.deleteProducts
);

// adding the bid for the single product
router.post(
    "/products/bidAdded/:productID",
    ensureAuthenticated,
    productController.adddingBid
);

module.exports = router;