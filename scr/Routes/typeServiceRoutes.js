const express = require("express");
const router = express.Router();

const { isValidToken } = require("../Ultils/Ultils");
const typeServiceController = require("../Controllers/typeServiceController");

router.post('/register', isValidToken, typeServiceController.registerController);
router.get('/listTypeServices', isValidToken, typeServiceController.listTypeServiceController);
router.get('/:id', isValidToken, typeServiceController.getTypeServiceController);
router.put('/update/:id', isValidToken, typeServiceController.editController);
// router.delete('/delete', isValidToken, productController.deleteproductController);

module.exports = router;