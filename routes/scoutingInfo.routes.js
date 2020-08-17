const { authJwt } = require('../middlewares');
const  controller = require('../controllers/scoutingInfo.controller')

module.exports = function (app) {
    app.get("/scoutingInfo", [authJwt.verifyToken], controller.getAll);
};