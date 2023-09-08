const express = require('express');
const router = express.Router();
const userModel = require('./Model/user'); // Import your userModel

// GET all users or users with a filter
router.get('/', async (req, res) => {
    try {
        const filter = req.query.filter;
        const users = await userModel.getUsers(filter);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST a new user
router.post('/', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newUser = await userModel.createUser(username, password, email);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await userModel.deleteUser(id);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT (update) a user by ID (you need to pass updated data in the request body)
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await userModel.updateUser(id, updatedData);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
