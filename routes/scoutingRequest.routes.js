const { authJwt } = require('../middlewares');
const controller = require('../controllers/scoutingRequest.controller')

module.exports = function (app) {
    app.get('/scoutingRequest', [authJwt.verifyToken], controller.getAll)
};