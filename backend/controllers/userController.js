
const User = require('../models/userModel')

exports.fetchAllUsers = (req, res, next) => {
    User.find().then(result => {
        res.status(200).json({ message: 'Success!', users: result })
    }
    ).catch(err => console.log(err));
};


exports.getUser = (req, res, next) => {
    const userId = req.params.userId;       // its not req.body: we are picking it from URL
    console.log(userId);
    User.findById(userId).then(result => {
        if (!result) {
            res.status(400).json({ status: 'Not Found!', message: 'No Such User Found.' })
        } else {
            res.status(200).json({ message: 'Success!', user: result })
        }
    }
    ).catch(err => console.log(err));
};

// --------- Add Validatiion
exports.addUser = (req, res, next) => {

    console.log(req.body);

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        username: username,
        email: email,
        password: password,
        status: 'New User',
        posts: []
    });

    console.log(user);

    user.save().then(result => {
        console.log('User Created!');
        res.status(201).json({ message: 'New User Created Successfully', user: user })
    }).catch(err => console.log(err))
};



exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;       // its not req.body: we are picking it from URL
  
    User.findByIdAndDelete(userId).then(result => {
        if (!result) {
            res.status(400).json({ status: 'Not Found!', message: 'No Such User Found.' })
        } else {
            res.status(200).json({ message: 'Success!', deletedUser: result })
        }
    }
    ).catch(err => console.log(err));
};




exports.editUser = (req, res, next) => {

    const userId = req.params.userId;
    User.findById(userId).then(getResult => {
        if (!getResult) {
            res.status(400).json({ status: 'Not Found!', message: 'No Such User Found.' })
        } else {

            
            const updatedUsername = req.body.username;
            const updatedEmail = req.body.email;
            const updatedPassword= req.body.password;

            getResult.username = updatedUsername;
            getResult.email = updatedEmail;
            getResult.password = updatedPassword;

            getResult.save().then(putResult => {
                //  console.log('inside putResult')
                if (!putResult) {
                    res.status(400).json({ status: 'Operation Failed!', message: 'Operation could not be completed.' })
                } else {
                    res.status(200).json({ status: 'Opeartion Success!', user: putResult })
                }
            });

        }
    }).catch(err => console.log(err));
};

