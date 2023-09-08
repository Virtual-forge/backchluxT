const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    userid: {
        type: String, // Assuming you need to associate a user with a car
    },
    carName: {
        type: String,
        required: true,
    },
    seats: {
        type: Number,
    },
    imageSrc: {
        type: String, // Assuming you store the image source as a string (file path or URL)
    },
    category: {
        type: String,
    },
    year: {
        type: Number,
    },
    color: {
        type: String,
    },
    fuelType: {
        type: String,
    },
    price: {
        type: Number,
    }
});

const Car = mongoose.model('cars', carSchema);

class CarModel {
    static async getCars(filter) {
        try {
            if (!filter) {
                return await Car.find();
            } else {
                return await Car.find(filter);
            }
        } catch (error) {
            throw error;
        }
    }

    static async createCar(userid, carName, seats, imageSrc, category, year, color, fuelType, price) {
        try {
            const newCar = new Car({
                userid,
                carName,
                seats,
                imageSrc,
                category,
                year,
                color,
                fuelType,
                price,
            });
            const createdCar = await newCar.save();
            return createdCar;
        } catch (error) {
            throw error;
        }
    }

    static async getMyCars(username) {
        try {
            return await Car.find({ userid: username });
        } catch (error) {
            throw error;
        }
    }

    static async deleteCar(id) {
        try {
            await Car.findByIdAndDelete(id);
            return 'Car listing deleted.';
        } catch (error) {
            throw error;
        }
    }

    static async updateCar(id, updatedData) {
        try {
            await Car.findByIdAndUpdate(id, updatedData);
            return 'Car updated';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CarModel;
