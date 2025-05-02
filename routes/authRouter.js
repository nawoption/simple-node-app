const express = require("express");
const { register, login } = require("../controllers/authController");
const { registerSchema, loginSchema } = require("../schemas/userSchema");
const { validateBody } = require("../middlewares/validator");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);

module.exports = router;
