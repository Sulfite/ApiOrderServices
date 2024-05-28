const express = require("express");
const router = express.Router();

const { isValidToken } = require("../Ultils/Ultils");
const phoneController = require("../Controllers/phoneController");

// Usuarios
router.post('/registerPhone', phoneController.registerPhoneController);
router.put('/updatePhone/:id', phoneController.updatePhoneController);
router.get('/listPhones/:id',  phoneController.listPhonesController);
router.get('/detailsPhone/:id', phoneController.detailsPhoneController);
router.delete('/deletePhone/:id', phoneController.deletePhoneController);

module.exports = router;