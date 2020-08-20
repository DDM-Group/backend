var createError = require('http-errors');
const db = require('../models');
const {Exam} = db.models;

exports.getForUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (id !== 'undefined') {
            const exams = await Exam
              .find({ 'results.user': { $eq: id }}).exec()
            const exs = exams.map(ex => {
                const {name, results} = ex.toObject()
                const result = results.find(r =>  r.user == id)
                return { name, result }
            })
            res.send(exs)
        } else {
            next(createError(503, 'You are unauthorized!'))
        }
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
}