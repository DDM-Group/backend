const { authJwt } = require("../middlewares");
const controller = require("../controllers/library.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/library", [authJwt.accessAll], controller.getAll);
  
    app.get("/library/:id", [authJwt.accessAll], controller.getById);
  };

