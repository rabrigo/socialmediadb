const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        unique: true,
        trim: true,
        required: true
    }
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = Thought;