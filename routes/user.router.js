const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");

//http://localhost:5000/api/v1/auth/register 
router.post("/register", userControllers.register);

//http://localhost:5000/api/v1/auth/login
router.post("/login", userControllers.login);



module.exports = router;