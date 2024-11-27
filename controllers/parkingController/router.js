const express = require('express');
const router = express.Router();
const DriverUserController = require('./controller');

router.post('/nearby-parkings', DriverUserController.getNearbyParkings);
router.post('/reserve', DriverUserController.createReservation);

module.exports = router;
