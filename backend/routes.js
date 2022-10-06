const router = require("express").Router();
const authController = require("./controllers/auth-controller");

router.post("/api/login", authController.login);
router.get('api/refresh', authController.refreshAccessToken)
module.exports = router;
