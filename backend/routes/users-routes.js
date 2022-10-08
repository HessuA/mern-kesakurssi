const express = require("express");
const userControllers = require("../controllers/user-controllers");

// luodaan tänne reititys users resurssille

const userRouter = express.Router();

//  login-endpoint
userRouter.post("/api/users/login/", userControllers.logIn);

// Hae kaikki endpoint
userRouter.get("/api/users/", userControllers.getAllUsers);

// Lisää käyttäjä
userRouter.post("/api/users/", userControllers.createUser);

module.exports = userRouter;
