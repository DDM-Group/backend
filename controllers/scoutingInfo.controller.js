const createError = require('http-errors');
const db = require('../models');
const {ScoutingInfo} = db.models;

exports.getAll = (req, res, next) => {
    const {query, userLevel} = req;
    const body = query.type ? {type: query.type} : {}
    ScoutingInfo.find(body).exec()
        .then(data => {
            res.send(filterScoutingInfoData(data, userLevel));
        })
        .catch(err => {
            console.log('err :', err);
            next(createError(503, err))
        })
}

filterScoutingInfoData = (data, level) => {
    return data.map(item => filterScoutingInfoItem(item, level));
}

filterScoutingInfoItem = (item, level) =>{
    const sensitiveRegexp = /\((d),([^)]+)\)/g;
    const data = Object.fromEntries(Object.entries(item.data).map(([key, value]) =>{
        const matches = [...value.matchAll(sensitiveRegexp)];
        console.log('matches :>> ', matches);
        let text = value;
        matches.forEach(item => {
            text = text.replace(item[0], item[1] > level ? '' : item[2])
        })
        return[key, text];
    }));
    const response = {
        ...item._doc,
        data
    }
    return response;
}