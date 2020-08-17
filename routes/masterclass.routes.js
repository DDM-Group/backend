const { authJwt } = require("../middlewares");
const controller = require("../controllers/masterclass.controller");

module.exports = function(app) {
    app.get("/masterclass/user/:id", [authJwt.verifyToken], controller.getForUser);

    app.get("/masterclass/mapped", [authJwt.verifyToken], controller.getMapped);

    app.get("/masterclass", [authJwt.verifyToken], controller.getAll);

    app.get("/masterclass/:id", [authJwt.verifyToken], controller.getById);

    app.post("/masterclass/:id/register", [authJwt.verifyToken], controller.register);
  };

