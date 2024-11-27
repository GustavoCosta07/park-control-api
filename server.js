require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT;
const router = require('./controllers/driverUserController/router');
const routerParkings = require('./controllers/parkingController/router');
const garageOperator = require('./controllers/garageOperatorController/router');

app.use(cors());
app.use(express.json());
app.use('/api', router, routerParkings, garageOperator);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
