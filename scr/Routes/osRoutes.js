const express = require("express");
const router = express.Router();

const { isValidToken } = require("../Ultils/Ultils");
const osController = require("../Controllers/osController");

router.post('/register', isValidToken, osController.registerController);
router.put('/edit', isValidToken, osController.editController);
router.put('/close', isValidToken, osController.closeOSController);
router.post('/listOs', isValidToken, osController.listOsController);
router.get('/osDetails/:id', isValidToken, osController.osDetailsController);

module.exports = router;