var createError = require('http-errors');
const db = require('../models');
const {MasterClass} = db.models;

exports.getAll = (req, res, next) => {
    MasterClass.find({}).exec()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log('err :', err);
            next(createError(503, err))
        })
}

exports.getById = (req, res, next) => {
    MasterClass.findById(req.params.id)
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
        const masterclass = await MasterClass.findById(req.params.id).populate("students", "-__v")
        if (masterclass.students.length >= masterclass.max_students) {
            return res.status(409).send({ message: "Превышен лимит записавшихся" });
        }
        if (masterclass.students.findIndex(student => student.id === req.userId) !== -1) {
            return res.status(409).send({ message: "Пользователь уже записан" });
        }
        const result = await MasterClass.findByIdAndUpdate(req.params.id, { $push: { students: req.userId}})
        return res.status(201).send(result);
    } catch (err)  {
        console.log('err :', err);
        next(createError(503, err))
    }
}
