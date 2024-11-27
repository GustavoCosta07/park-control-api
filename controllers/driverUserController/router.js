const express = require('express');
const router = express.Router();
const DriverUserController = require('./controller');

router.post('/register', DriverUserController.createDriverUser);
router.post('/login', DriverUserController.loginDriverUser);

module.exports = router;
