const Post = require('../models/postModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');


exports.postLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(user => {
        // console.log(user);

        if (user != null && user.password === password) {
            console.log('User LoggedId');
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            },
                'somelongsecrettoencrypt',
                { expiresIn: '1h' }
            );
            res.status(200).json({ message: 'Successful Login!', userId: user._id, token: token })
        } else {
            console.log('Invalid user cred!');
            res.status(400).json({ message: 'Login Failed.', details: 'Invalid Credentials!' });
        }
    }).catch(err => {
        console.log('Error Details : ' + err);
        res.status(400).json({ message: 'Login Failed.', details: 'Invalid Credentials!' });
    })
};