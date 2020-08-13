const createError = require('http-errors');
const moment = require('moment');
const db = require('../models');
const {Operation} = db.models;

exports.getAll = async (req, res, next) => {
    try {
        const operations = await Operation
          .find({}).populate("users").exec()
        res.send(operations)
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
        const operations = await Operation
          .find({ users: { $elemMatch: { $eq: req.params.id }}}).populate("users").exec()
        res.send(operations)
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
