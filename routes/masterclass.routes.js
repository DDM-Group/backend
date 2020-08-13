const { authJwt } = require("../middlewares");
const controller = require("../controllers/masterclass.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/masterclass/user/:id", [authJwt.verifyToken], controller.getForUser);

    app.get("/masterclass", [authJwt.verifyToken], controller.getAll);
  
    app.get("/masterclass/:id", [authJwt.verifyToken], controller.getById);

    app.post("/masterclass/:id/register", [authJwt.verifyToken], controller.register);
  };

