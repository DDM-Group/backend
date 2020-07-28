var createError = require('http-errors');
const db = require('../models');
const {Library} = db.models;

exports.getAll = (req, res) => {
    const {query, userLevel} = req;
    const body = query.type ? {type: query.type} : {};
    Library.find(body).exec()
        .then(data => {
            res.send(filterLibraryData(data, userLevel));
        })
        .catch(err => {
            console.log('err :', err);
            next(createError(503, err))
        })
}

exports.getById = (req, res) => {
    const { userLevel } = req;
    Library.findById(req.params.id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log('err :', err);
        next(createError(503, err))
    })
}

filterLibraryData = (data, level) => {
    return data.map(item => filterLibraryItem(item, level));
}

filterLibraryItem = (item, level) => {
    console.log('level :>> ', level);
    console.log('item :>> ', item);
    const sensitiveRegexp = /\((\d),([^)]+)\)/g;
    const result = Object.fromEntries(Object.entries(item.data).map(([key, value]) => {
        const matches = [...value.matchAll(sensitiveRegexp)];
        console.log('matches :>> ', matches);
        let text = value;
        matches.forEach(item => {
            text = text.replace(item[0], item[1] > level ? '' : item[2])
        })
        return [key, text];
    }));
    console.log('result :>> ', result);
    return result;
}