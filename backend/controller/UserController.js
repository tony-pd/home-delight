const UserModel = require("../model/UserModel");

const {
  createFactory,
  getAllFactory,
  getByIdFactory,
  deleteByIdFactory,
  signUpfactory,
  loginFactory,
} = require("../utility/factory");

// User Crud
const createUserHandler = createFactory(UserModel);
const getAllUserHandler = getAllFactory(UserModel);
const getUserById = getByIdFactory(UserModel);
const deleteUserById = deleteByIdFactory(UserModel);

const signUpHandler = signUpfactory(UserModel);
const loginHandler = loginFactory(UserModel);

module.exports = {
  createUserHandler,
  getAllUserHandler,
  getUserById,
  deleteUserById,
  signUpHandler,
  loginHandler
};
