const express = require('express');
const router = express.Router();
const GaragistaController = require('./controller');

router.post('/register-garagista', GaragistaController.createGaragista);
router.post('/login-garagista', GaragistaController.loginGaragista);
router.post('/parkings', GaragistaController.createParking);
router.put('/parkings/:id', GaragistaController.updateParking);
router.post('/parkings/:id/increment', GaragistaController.incrementSpot);
router.post('/parkings/:id/decrement', GaragistaController.decrementSpot);
router.get('/parkings/:id/reservations', GaragistaController.getReservations);
router.post('/reservations/:id/arrival', GaragistaController.confirmArrival);
router.post('/reservations/departure', GaragistaController.confirmDeparture);

module.exports = router;
