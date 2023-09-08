const express = require('express');
const bodyParser = require('body-parser');


const userController = require('./Controller/userController');
const carController = require('./Controller/carController');
const reservationController = require('./Controller/reservationController');


const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies

app.use('/users', userController);
app.use('/cars', carController);
app.use('/reservations', reservationController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});