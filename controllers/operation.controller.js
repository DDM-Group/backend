const createError = require('http-errors');
const moment = require('moment');
const db = require('../models');
const {Operation, User} = db.models;

exports.getAll = async (req, res, next) => {
    try {
        const operations = await Operation
          .find({isVisible: true})
          .populate("users")
          .populate('manager')
          .exec()
        let user = await User.findById(req.userId).exec()
        user = user.toObject()
        res.send(operations.filter(op => op.level <= user.level))
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
}

exports.getById = async (req, res, next) => {
    try {
        const operation = Operation.findById(req.params.id)
          .populate("users").exec()
          res.send(operation)
    } catch (err) {
        console.error(err);
        next(createError(503, err))
    }
}

exports.getForUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (id !== 'undefined') {
            const operations = await Operation
              .find({
                   'points.user': { $eq: id },
                   users: { $elemMatch: { $eq: id }}
                }).exec()
            const ops = operations.map(op => {
                const {name, all_points, points, success} = op.toObject()
                const result = points.find(r =>  r.user == id).points
                return { name, success, all_points, result }
            })
            res.send(ops)
        } else {
            next(createError(503, 'You are unauthorized!'))
        }
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
}

exports.register = async (req, res, next) => {
    try {
        const operation = await Operation.findById(req.params.id).populate("users").exec()
        if (operation.users.findIndex(user => user.id === req.userId) !== -1) {
            return res.status(409).send({ message: "Пользователь уже записан" });
        }
        let user = await User.findById(req.userId).exec()
        user = user.toObject()
        if (operation.level > user.level) {
            return res.status(409).send({ message: "У вас недостаточный уровень для этой высадки" });
        }
        const result = await (await Operation.findByIdAndUpdate(req.params.id, { $push: { users: req.userId}}, {new: true}))
        return res.status(201).send(result);
    } catch (err)  {
        console.error('err :', err);
        next(createError(503, err))
    }
}

exports.getView = async (req, res, next) => {
    try {
        const operations = await Operation.find(
            {
                date: {
                    $gte: moment().startOf('day').toISOString(),
                    $lt: moment().endOf('day').toISOString()
                }
            }
        ).populate("users").exec()
        console.log('operations :>> ', operations);
        return res.status(200).send(operations)
    } catch (err) {
        console.error('err :>> ', err);
        next(createError(503, err))
    }
}
