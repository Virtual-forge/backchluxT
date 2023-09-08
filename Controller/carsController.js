const express = require('express');
const router = express.Router();
const carModel = require('./Model/car'); // Import your carModel
import { getCurrentUser } from './getCurrentUser'; // Make sure to provide the correct path for getCurrentUser

// GET all cars or cars with a filter
router.get('/', async (req, res) => {
    try {
        const filter = req.query.filter;
        const cars = await carModel.getCars(filter);
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST a new car listing
router.post('/', async (req, res) => {
    try {
        const { carName, seats, imageSrc, category, year, color, fuelType, price } = req.body;
        const userid = getCurrentUser().username;
        const newCar = await carModel.createCar(userid, carName, seats, imageSrc, category, year, color, fuelType, price);
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET cars owned by the currently logged-in user
router.get('/my-cars', async (req, res) => {
    try {
      //might need to change this variable to json format
        const username = getCurrentUser().username;
        const myCars = await carModel.getMyCars(username);
        res.json(myCars);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE a car listing by ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await carModel.deleteCar(id);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT (update) a car listing by ID (you need to pass updated data in the request body)
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await carModel.updateCar(id, updatedData);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
