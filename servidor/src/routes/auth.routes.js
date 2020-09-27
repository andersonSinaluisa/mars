const { Router } = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const router = Router();

router.post(
  "/register",
  [
    check("fullname", "Fullname is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "The password must have a minimum of 6 characters"
    ).isLength({ min: 6 }),
  ],
  authController.register
);

router.post(
  "/login",
  [
    check("username", "Username is required").not().isEmpty(),
    check(
      "password",
      "The password must have a minimum of 6 characters"
    ).isLength({ min: 6 }),
  ],
  authController.login
);

module.exports = router;
