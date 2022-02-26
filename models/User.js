const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Email validation failed'
          }
    }
})

module.exports = User;