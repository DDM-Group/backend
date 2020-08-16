const createError = require('http-errors');
const  db = require('../models');
const {ScoutingRequest} = db.models;
const moment = require('moment')

exports.getAll = (req, res, next) => {
    const {query, userLevel} = req;
    const body = query.type ? {type: query.type} : {}
    ScoutingRequest.find(body).exec()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log('err :', err);
            next(createError(503, err))
        })
}

exports.register = (req, res, next) => {
    try {
        const {requestObject, place, task} = req.body;
        console.log(requestObject)
        console.log(place)
        console.log(task)
        const scoutingRequest = new ScoutingRequest({
            requestObject,
            place,
            task,
            name: task, //TODO: change to username_number
            requestedBy: req.userId,
            startDate: moment(),
            dueDate: moment().add(12, 'hours')
        });
        scoutingRequest.save((err, request) => {
            if (err) {
                console.log(err)
                res.status(500).send({message: err});
                return;
            }
            res.status(204).send({message: "Request was registered successfully!"});
        })
    } catch (e) {
        console.log(e)
        res.status(503).send(e)
    }
}

