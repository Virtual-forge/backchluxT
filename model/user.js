const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    cars: {
        type: String,
    },
    reservation: {},
    performance: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    permission: {
        type: String,
        enum: ['client', 'agent', 'admin'],
        required: true
    }
});

const User = mongoose.model('users', userSchema);

class UserModel {
    static async getOne(filter){
        try {
            return await User.findOne(filter);
        } catch (error) {
            throw error;
        }
    }
    static async getUsers(filter) {
        try {
            if (!filter) {
                return await User.find();
            } else {
                return await User.find(filter);
            }
        } catch (error) {
            throw error;
        }
    }

    static async createUser(username, password, email) {
        try {
            const newUser = new User({
                username,
                hashedPassword: password,
                email,
                permission: 'client', // Default permission
            });
            const createdUser = await newUser.save();
            return createdUser;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            await User.findByIdAndDelete(id);
            return 'User is deleted.';
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, updatedData) {
        try {
            await User.findByIdAndUpdate(id, updatedData);
            return 'User updated';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;
module.exports = User;