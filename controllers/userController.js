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
        User.find()
        .then(async (users) => {
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
            .select('-__V')
            .then(async (user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
              })
    },

    //createUser
    createUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },

    //deleteUser
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

    //updateUser
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with this ID!'})
                    : res.json(user)
            )
    },

    //addThought
    addThought(req, res) {
        console.log('You are adding a thought');
        console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { thoughts: req.body } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(student)
          )
          .catch((err) => res.status(500).json(err));
      },

    //removeThought
    removeThought(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { thought: { thoughttId: req.params.thoughtId } } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
}