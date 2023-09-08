const Reservation = require('./model/reservation');
const express = require('express');
const router = express.Router();
import { getCurrentUser } from './getCurrentUser';


// GET all reservations  keep here for now 
router.get('/', async (req, res) => {
    try {
      const reservations = await Reservation.getReservation();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // GET reservations with a filter (example: { seats: x, price: x })
  router.get('/filter', async (req, res) => {
    try {
      const filter = req.query.filter; // Assuming you send filter as query parameters
      const filteredReservations = await Reservation.getReservation(filter);
      res.json(filteredReservations);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // GET reservations for the currently logged-in user
  router.get('/my-reservations', async (req, res) => {
    try {
      const userId = getCurrentUser().id;
      const myReservations = await Reservation.getMyReservation(userId);
      res.json(myReservations);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  // POST a new reservation
  router.get('/my-reservations', async (req, res) => {
    try {
      const userId = getCurrentUser().id;
      const myReservations = await Reservation.getMyReservation(userId);
      res.json(myReservations);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // DELETE a reservation by ID
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Reservation.deleteReservation(id);
      res.json({ message: result });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // PUT (update) a reservation by ID (you need to pass updated data in the request body)
  router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { car, startDate, endDate, city, price } = req.body;
      const updatedReservation = new Reservation(car, startDate, endDate, city, price);
      const result = await Reservation.updateReservation(id, updatedReservation);
      res.json({ message: result });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  module.exports = router;
  