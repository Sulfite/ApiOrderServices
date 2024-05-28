const express = require("express");
const router = express.Router();

const { isValidToken } = require("../Ultils/Ultils");
const osController = require("../Controllers/osController");

router.post('/register', isValidToken, osController.registerController);
router.put('/edit', isValidToken, osController.editController);
router.put('/close', isValidToken, osController.closeOSController);
router.post('/listOs', isValidToken, osController.listOsController);
router.post('/listEmployeOs', isValidToken, osController.listEmployeOsController);
router.get('/osDetails/:id', isValidToken, osController.osDetailsController);

router.get('/osMonthClosed', isValidToken, osController.osMonthClosedController);
router.get('/osMonthTypeService', isValidToken, osController.osMonthTypesServicesController);

module.exports = router;