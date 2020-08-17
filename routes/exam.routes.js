const { authJwt } = require("../middlewares");
const controller = require("../controllers/exam.controller");

module.exports = function(app) {
    app.get("/exam/user/:id", [authJwt.verifyToken], controller.getForUser);
}