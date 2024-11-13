const express = require('express');
const isAuth = require('../middleware/is-auth');

//const app = express();   // NOT app

const router = express.Router();

const feedController = require('../controllers/feedController');

// GET /feed/posts
router.get('/posts', isAuth, feedController.fetchAllPosts);

router.get('/posts/:postId',  isAuth, feedController.getPost);

router.post('/posts/:postId', isAuth, feedController.deletePost);

router.put('/posts/:postId', isAuth, feedController.editPost);

router.post('/post', isAuth, feedController.addPost);


module.exports = router;