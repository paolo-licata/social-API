const router = require("express").Router();
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require("../controllers/authControllers");
const { verifyToken } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getUser);
router.put("/update", verifyToken, updateUser);
router.delete("/delete", verifyToken, deleteUser);

module.exports = router;