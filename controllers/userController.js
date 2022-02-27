const { User, Thought } = require('../models');

const userCount = async () => 
    User.aggregate()
    .count('number of users')
    .then((numberOfUsers) => numberOfUsers);

const userThoughts = async(userId) =>
    User.aggregate([
        {
            $unwind: 'thoughts',
        },
        {
            $match:{_id:ObjectId(userId)}
        }
    ])

module.exports = {
    getUsers(req, res) {
        Student.find()
        .then(async (students) => {
            const userObj = {
                users,
                userCount: await userCount()
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-___V')
            .then(async (user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json({
                    student,
                    grade: await grade(req.params.userId)
                })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
              })
    }

    //createUser

    //deleteUser

    //addThought

    //removeThought
}