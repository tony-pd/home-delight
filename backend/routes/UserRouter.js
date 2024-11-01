const express = require("express");
const UserRouter = express.Router();

const {
    createUserHandler,
    getAllUserHandler,
    getUserById,
    deleteUserById,
    signUpHandler,
    loginHandler
} = require("../controller/UserController");

const sanityMiddleware = require("../middleware/sanityMiddleware");
const protectedRouteMiddleware = require("../middleware/protectedMiddleware");

const { sign } = require("jsonwebtoken");

//User handlers
UserRouter.route("/")
    .post(sanityMiddleware, createUserHandler)
    .get(getAllUserHandler);
 
UserRouter.route("/signup")
    .post(signUpHandler);

UserRouter.route("/login")
    .post(loginHandler);

UserRouter.route("/protected")
    .get(protectedRouteMiddleware, getAllUserHandler);

UserRouter.route("/:userId")
    .get(getUserById)
    .delete(deleteUserById);

module.exports = UserRouter;