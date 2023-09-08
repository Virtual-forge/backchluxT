// In Controller/index.js
const express = require('express');
const router = express.Router();

const userController = require('./userController');
const otherController = require('./otherController');

router.use('/users', userController);
router.use('/other', otherController);

module.exports = router;