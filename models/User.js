const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')

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
                validator: () => Promise.resolve(false),
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