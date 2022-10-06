const router = require("express").Router();
const authController = require("./controllers/auth-controller");

router.post("/api/login", authController.login);

module.exports = router;
