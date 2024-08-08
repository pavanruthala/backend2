const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const hasRealmRoles = require('../middleware/keycloakMiddleware');


router.post('/', hasRealmRoles(['admin']), userController.createUser);
router.put('/:id', hasRealmRoles(['admin']), userController.updateUser);
router.get('/:id', hasRealmRoles([]), userController.getUser);
router.get('/', hasRealmRoles([]), userController.listUsers);
router.delete('/:id', hasRealmRoles(['admin']), userController.deleteUser);

module.exports = router;

