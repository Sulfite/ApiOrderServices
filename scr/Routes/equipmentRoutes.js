const express = require("express");
const router = express.Router();

const { isValidToken } = require("../Ultils/Ultils");
const equipamentController = require("../Controllers/equipmentController");

router.get('/listEquipaments', isValidToken, equipamentController.listEquipamentsController);
router.post('/register', isValidToken, equipamentController.registerController);
router.get('/getEquipment/:id', isValidToken, equipamentController.getEquipamentController);
router.put('/update/:id', isValidToken, equipamentController.editController);

router.get('/listTypeEquipaments', isValidToken, equipamentController.listTypeEquipamentsController);
router.get('/type/:id', isValidToken, equipamentController.getTypeEquipamentController);
router.post('/registerType', isValidToken, equipamentController.registerTypeEquipamentController);
router.put('/updateType/:id', isValidToken, equipamentController.editTypeEquipamentController);

// router.post('/listProducts', isValidToken, equipamentController.listProductPaginationController);

router.get('/listSectors', isValidToken, equipamentController.listaSectorsController);
// router.get('/listaTiposServicos', isValidToken, equipamentoController.listaTiposServicossController);

module.exports = router;