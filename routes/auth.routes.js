const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/authJwt");

module.exports = function(app) {

  app.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/auth/signin", controller.signin);

  app.post(
    "/auth/autoupdate",
    [verifyToken],
    controller.autoupdate
  )
};