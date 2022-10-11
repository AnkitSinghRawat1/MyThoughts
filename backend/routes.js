const router = require("express").Router();
const authController = require("./controllers/auth-controller");
const authMiddleware = require("./middlewares/auth-middleware");

router.post("/api/login", authController.login);
router.get('/api/refresh', authController.refreshAccessToken)
router.post("/api/logout", authMiddleware, authController.logout);
router.post("/api/updateUserProfile", authMiddleware, authController.updateUserProfile)


module.exports = router;
