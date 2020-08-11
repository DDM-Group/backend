const createError = require('http-errors');
const db = require("../models");
const { User, Role } = db.models;

exports.qr = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
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

exports.activate = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.active = true
        user.save()
        res.status(200).send(user)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
};

exports.kill = async (req, res) => {
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

exports.heal = async (req, res) => {
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

exports.activateAll = async (req, res) => {
    try {
        const resp = await User.updateMany({}, { $set: { active: true }}).exec();
        res.status(200).send(resp)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
};

exports.killAll = async (req, res) => {
    try {
        const resp = await User.updateMany({}, { $set: { alive: false }}).exec();
        res.status(200).send(resp)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
};

exports.healAll = async (req, res) => {
    try {
        const resp = await User.updateMany({}, { $set: { alive: true }}).exec();
        res.status(200).send(resp)
    } catch (err) {
        console.error(err)
        next(createError(503, err))
    }
};