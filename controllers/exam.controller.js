var createError = require('http-errors');
const db = require('../models');
const {Exam} = db.models;

exports.getForUser = async (req, res, next) => {
    try {
        const operations = await Exam
          .find({ students: { $elemMatch: { $eq: req.params.id }}}).populate("users").exec()
        const ops = operations.map(op => {
            const {students, ...res} = {...op._doc}
            return res
        })
        res.send(ops)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
}