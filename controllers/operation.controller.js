var createError = require('http-errors');
const db = require('../models');
const {Operation} = db.models;

exports.getAll = (req, res, next) => {
    Operation.find({}).populate("users").exec()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log('err :', err);
            next(createError(503, err))
        })
}

exports.getById = (req, res, next) => {
    Operation.findById(req.params.id)
    .populate("users")
    .exec()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log('err :', err);
        next(createError(503, err))
    })
}

exports.register = async (req, res, next) => {
    try {
        const operation = await Operation.findById(req.params.id).populate("users").exec()
        if (operation.users.findIndex(user => user.id === req.userId) !== -1) {
            return res.status(409).send({ message: "Пользователь уже записан" });
        }
        const result = await (await Operation.findByIdAndUpdate(req.params.id, { $push: { users: req.userId}}, {new: true}))
        return res.status(201).send(result);
    } catch (err)  {
        console.log('err :', err);
        next(createError(503, err))
    }
}
