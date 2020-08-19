const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.get("/user/activateOperation/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.activateOperation);
  app.get("/user/activate", [authJwt.verifyToken, authJwt.isAdmin], controller.activateAll);
  app.get("/user/kill", [authJwt.verifyToken, authJwt.isAdmin], controller.killAll);
  app.get("/user/heal", [authJwt.verifyToken, authJwt.isAdmin], controller.healAll);

  app.get("/user/:id/activate", [authJwt.verifyToken], controller.activate);
  app.get("/user/:id/kill", [authJwt.verifyToken], controller.kill);
  app.get("/user/:id/heal", [authJwt.verifyToken], controller.heal);
  app.get("/user/:id", controller.qr);

};