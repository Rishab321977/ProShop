import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc Auth user & get token
// @route Get /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Register User
// @route Post /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

// @desc Logout User / clear cookies
// @route Post /api/users/Logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send('Logout user');
});

// @desc Get User profile
// @route Get /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

// @desc Update User profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

// @desc Get User profile / Admin
// @route Get /api/users
// @access Private / Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

// @desc Get User by ID
// @route Get /api/users/:id
// @access Private / Admin
const getUsersByID = asyncHandler(async (req, res) => {
  res.send('get user by Id');
});

// @desc Delete User
// @route Delete /api/users/:id
// @access Private / Admin
const deleteUsers = asyncHandler(async (req, res) => {
  res.send('delete users');
});

// @desc Update User / Admin
// @route Put /api/users/:id
// @access Private / Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update users');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUsers,
  getUsersByID,
  updateUserProfile,
  deleteUsers,
  updateUser,
};
