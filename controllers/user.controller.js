const createError = require('http-errors');
const db = require("../models");
const { User, Role, Operation } = db.models;

exports.qr = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).exec()
        if (!user.active) {
            user.active = true
            user.alive = true
            user.save()
        } else {
            user.alive = false
            //TODO: add check to prevent double killing
            user.save()
        }
        res.status(200).send(user)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
};

exports.activate = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).exec()
        user.active = true
        user.save()
        res.status(200).send(user)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
};

exports.kill = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).exec()
        console.log('user :>> ', user);
        user.alive = false
        user.save()
        res.status(200).send(user)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
};

exports.heal = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        user.alive = false
        user.save()
        res.status(200).send(user)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
};

exports.activateOperation = async (req, res, next) => {
    try {
        const operation = await Operation.findById(req.params.id).exec()
        await Promise.all(operation.users.map(async userId => {
            user = await User.findById(userId)
            console.log('user :>> ', user);
            user.active = true
            user.alive = true
            user.save()
        }))
        res.status(200).send(user)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
}

exports.activateAll = async (req, res, next) => {
    try {
        const resp = await User.updateMany({}, { $set: { active: true }}).exec();
        res.status(200).send(resp)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
};

exports.killAll = async (req, res, next) => {
    try {
        const resp = await User.updateMany({}, { $set: { alive: false }}).exec();
        res.status(200).send(resp)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
};

exports.healAll = async (req, res, next) => {
    try {
        const resp = await User.updateMany({}, { $set: { alive: true }}).exec();
        res.status(200).send(resp)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
};