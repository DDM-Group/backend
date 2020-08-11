const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/user/activate", [authJwt.verifyToken, authJwt.isAdmin], controller.activateAll);
  app.get("/user/kill", [authJwt.verifyToken, authJwt.isAdmin], controller.killAll);
  app.get("/user/heal", [authJwt.verifyToken, authJwt.isAdmin], controller.healAll);

  app.get("/user/:id", controller.qr);
  app.get("/user/:id/activate", [authJwt.verifyToken, authJwt.isAdmin], controller.activate);
  app.get("/user/:id/kill", [authJwt.verifyToken, authJwt.isAdmin], controller.kill);
  app.get("/user/:id/heal", [authJwt.verifyToken, authJwt.isAdmin], controller.heal);

};