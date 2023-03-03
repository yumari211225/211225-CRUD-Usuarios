var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para buscar usuario
router.route('/user/search/:email').get(userController.searchUserControllerFunc);
// ruta para actualizar usuarios
router.route('/user/:id').put(userController.updateUserControllerFunc);
// ruta para eliminar usuario
router.route('/user/:email').delete(userController.deleteUserControllerFunc);
// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
module.exports = router;
