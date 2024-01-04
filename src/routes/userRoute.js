const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

// Authentication Route
router.post('/signup', userController.uploadProfileImage, authController.signup);
router.post('/login', authController.login);

//admin route
router.post('/admin', userController.uploadProfileImage, userController.createAdmin);

//user route
router.use(authController.protect)
router.get('/', authController.restrictTo('admin'), userController.getAllUsers);
router.get('/me', userController.getMe);
router.patch('/updateMe/:userId', userController.uploadProfileImage, userController.updateUser);
router.delete('/deleteMe/:userId', userController.deleteUser);

module.exports = router;