const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");

//(Path) -- http://localhost:5000/api/v1/auth/register 
router.post("/register", userControllers.register);

module.exports = router;