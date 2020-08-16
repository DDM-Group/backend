const createError = require('http-errors');
const  db = require('../models');
const {ScoutingRequest} = db.models;

exports.getAll = (req, res, next) => {
    const {query, userLevel} = req;
    const body = query.type ? {
        type: query.type,
        isVisible: true
    } : {
        isVisible: true
    }
    ScoutingRequest.find(body).exec()
        .then(data => {
            res.send(filterScoutingRequestData(data, userLevel));
        })
        .catch(err => {
            console.log('err :', err);
            next(createError(503, err))
        })
}

filterScoutingRequestData = (data, level) =>{
    return data.map(item => filterScoutingRequestItem(item, level));
}

filterScoutingRequestItem = (item, level) =>{
    const sensitiveRegex = /\((d),([^)]+)\)/g;
    const data = Object.fromEntries(Object.entries(item.data).map(([key, value]) =>{
        const matches = [...value.matchAll(sensitiveRegex)];
        console.log('matches :>> ', matches);
        let text = value;
        matches.forEach(item => {
            text = text.replace(item[0], item[1] > level ? '' : item[2])
        })
        return[key, text];
    }));
    const response ={
        ...item._doc,
        data
    }
    return response;
}