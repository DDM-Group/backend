var createError = require('http-errors');
const db = require('../models');
const {MasterClass} = db.models;

exports.getAll = async (req, res, next) => {
    try {
        const masterclasses = await MasterClass
          .find({isVisible: true})
          .populate("students")
          .exec()
        res.send(masterclasses)
    } catch (err) {
        console.error(err);
        next(createError(503, err))
    }
}

exports.getById = async (req, res, next) => {
    try {
        const masterclass = await MasterClass
          .findById(req.params.id)
          .populate("students")
          .exec()
        res.send(data)
    } catch (err) {
        console.error(err);
        next(createError(503, err))
    }
}


exports.getMapped = async (req, res, next) => {
    try {
        const masterclasses = await MasterClass
            .find({isVisible: true})
            .populate("students")
            .exec()
        
        const mappedMC = masterclasses.reduce((acc, mc) => {
            if (!acc[mc.name]) {
                acc[mc.name] = [mc]
            } else {
                acc[mc.name].push(mc)
            }
            return acc
        }, {})
        console.log('mappedMC :>> ', mappedMC);
        res.send(mappedMC)
    } catch (err) {
        console.error(err);
        next(createError(503, err))
    }
}

exports.getForUser = async (req, res, next) => {
    try {
        const operations = await MasterClass
          .find({ students: { $elemMatch: { $eq: req.params.id }}}).populate("users").exec()
        res.send(operations)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
}

exports.register = async (req, res, next) => {
    try {
        const masterclass = await MasterClass.findById(req.params.id).populate("students")
        if (masterclass.students.length >= masterclass.max_students) {
            return res.status(409).send({ message: "Превышен лимит записавшихся" });
        }
        if (masterclass.students.findIndex(student => student.id === req.userId) !== -1) {
            return res.status(409).send({ message: "Пользователь уже записан" });
        }
        const result = await MasterClass.findByIdAndUpdate(req.params.id, { $push: { students: req.userId}}, {new: true})
        return res.status(201).send(result);
    } catch (err)  {
        console.log('err :', err);
        next(createError(503, err))
    }
}
