const express = require('express');
const isAuth = require('../middleware/is-auth');

//const app = express();   // NOT app

const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// GET /feed/posts
router.get('/users',  isAuth, userController.fetchAllUsers);

//Create User
router.post('/user',  userController.addUser); 
 
//User Login
router.post('/user/login', authController.postLogin);

//Get Specific User
router.get('/users/:userId', isAuth,  userController.getUser);

//Delete User
router.post('/user/:userId', isAuth,  userController.deleteUser);

//Edit User
router.put('/user/:userId',  isAuth, userController.editUser);



module.exports = router;