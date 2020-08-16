const {authJwt} = require('../middlewares');
const controller = require('../controllers/scoutingRequest.controller')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-type, Accept'
        );
        next();
    });

    app.get('/scoutingRequest', [authJwt.verifyToken], controller.getAll)
    app.post('/scoutingRequest', [authJwt.verifyToken], controller.register)
};