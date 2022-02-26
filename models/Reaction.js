const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    username: String,
    email: String,
    thoughts: [],
    friends: [],
})

module.exports = Reaction;