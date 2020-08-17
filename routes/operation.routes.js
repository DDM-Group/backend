const { authJwt } = require("../middlewares");
const controller = require("../controllers/operation.controller");

module.exports = function(app) {
  
    app.get("/operation/view", [authJwt.accessAll], controller.getView);

    app.get("/operation/user/:id", [authJwt.verifyToken], controller.getForUser);
    
    app.get("/operation", [authJwt.verifyToken], controller.getAll);
  
    app.get("/operation/:id", [authJwt.verifyToken], controller.getById);

    app.post("/operation/:id/register", [authJwt.verifyToken], controller.register);
  };

