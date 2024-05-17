const express = require("express");
const router = express.Router();

const { isValidToken } = require("../Ultils/Ultils");
const productController = require("../Controllers/productController");

router.post('/register', isValidToken, productController.registerController);
router.post('/listProducts', isValidToken, productController.listProductPaginationController);
router.get('/:id', isValidToken, productController.getProductController);
router.put('/update/:id', isValidToken, productController.editController);
// router.delete('/delete', isValidToken, productController.deleteproductController);

module.exports = router;