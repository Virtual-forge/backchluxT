const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({

    user_ID:{
        type: String,
    },
    carID:{
        type: String,
    },
    startDate:{
        type: Date,
    },
    endDate:{
        type: Date,
    },
    
    city:{
        type: String,
    },
    price:{
        type: String,
    }
});

const reservation = mongoose.model('reservation', reservationSchema);

class ReservationClass{
    id;
    user;
    car;
    startDate;
    endDate;
    city;
    Price;
    constructor( car, startDate, endDate, city , price ){
        this.user = getCurrentUser().username;
        this.car = car;
        this.startDate = startDate;
        this.endDate = endDate;
        this.city = city;
        this.Price = price;
    }
    async getReservation(filter) {
        if (filter == undefined ){
            return await reservation.find();
        }
        else {
            return await reservation.find({filter});   
            // filter needs to have the format : {seats: x, price: x} etc...
        }
    }
    async getMyReservation() {
        return await reservation.find({
            username: getCurrentUser().username
        });
    }
    async pushReservation() {
        const createdReservation = await reservation.create(this);
        this.id = createdReservation._id.toString();
        return "reservation created";
      }
    async deleteReservation(id) {
         await reservation.findByIdAndDelete(id);
         return "reservation deleted";
    }
    async updateReservation(id) {
        await reservation.findByIdAndUpdate(id);
        return "reservation updated";
    }
}


module.exports = ReservationClass;