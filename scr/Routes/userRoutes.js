const express = require("express");
const router = express.Router();

const { isValidToken } = require("../Ultils/Ultils");
const userController = require("../Controllers/userController");

// Usuarios
router.post('/',  userController.testeController);
router.post('/login',  userController.loginController);
router.post('/register', isValidToken, userController.registerController);
router.post('/registerCustomer', userController.registerController);
router.put('/update/:id', isValidToken, userController.editController);
router.put('/updateActive', isValidToken, userController.editActiveController);
router.get('/user/:id', isValidToken, userController.getUserController);
router.get('/verificar', isValidToken, userController.checkUserController);
router.delete('/delete', isValidToken, userController.deleteUserController);
router.post('/listUsers', isValidToken, userController.listUserPaginationController);
router.get('/listaCustomer', isValidToken, userController.listCustomersServicesController);
router.get('/listaEmployees', isValidToken, userController.listEmployeesController);
router.get('/typeAccessUser', isValidToken, userController.typeAccessUserController);
// router.get('/conexao', isValidToken, usuarioController.conexaoController);

module.exports = router;