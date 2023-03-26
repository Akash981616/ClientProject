const express = require("express");
const auth = require("../controllers/auth");
const {
  loginValidator,
  signUpValidator,
} = require("./../middleware/validator");

const router = express.Router();

router.post("/signup", signUpValidator, auth.signup);
router.post("/login", loginValidator, auth.login);

module.exports = router;
