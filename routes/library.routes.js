const { authJwt } = require("../middlewares");
const controller = require("../controllers/library.controller");

module.exports = function(app) {
    app.get("/library", [authJwt.accessAll], controller.getAll);
  
    app.get("/library/:id", [authJwt.accessAll], controller.getById);
  };

