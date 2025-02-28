const router = require("express").Router();
const { registerUser, loginUser, updateUser, deleteUser } = require("../controllers/authControllers");
const { verifyToken } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", verifyToken, updateUser);
router.delete("/delete", verifyToken, deleteUser);

module.exports = router;