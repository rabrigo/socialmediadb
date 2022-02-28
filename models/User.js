const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')
// from last unit's hw
let emailRegex = `/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/`;

const userSchema = new Schema(
    {
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
                validator: function(v) {
                    return emailRegex.test(v);
                },
                message: 'Email validation failed'
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: this
            }
        ]
    },
    {
        toJSON: {
          getters: true,
        },
        id: false
    }
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('user', userSchema);
module.exports = User;