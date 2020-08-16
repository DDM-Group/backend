const { authJwt } = require("../middlewares");
const controller = require("../controllers/operation.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/operation/view", [authJwt.accessAll], controller.getView);

    app.get("/operation/user/:id", [authJwt.verifyToken], controller.getForUser);
    
    app.get("/operation", [authJwt.verifyToken], controller.getAll);
  
    app.get("/operation/:id", [authJwt.verifyToken], controller.getById);

    app.post("/operation/:id/register", [authJwt.verifyToken], controller.register);
  };

