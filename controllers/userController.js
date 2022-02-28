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
              : Application.deleteMany({ _id: { $in: user.applications } })
          )
          .then(() => res.json({ message: 'User and associated apps deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

    //format these last two:
    //addThought
    addAssignment(req, res) {
        console.log('You are adding an assignment');
        console.log(req.body);
        Student.findOneAndUpdate(
          { _id: req.params.studentId },
          { $addToSet: { assignments: req.body } },
          { runValidators: true, new: true }
        )
          .then((student) =>
            !student
              ? res
                  .status(404)
                  .json({ message: 'No student found with that ID :(' })
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