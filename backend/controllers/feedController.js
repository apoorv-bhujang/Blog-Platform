
const Post = require('../models/postModel')
const User = require('../models/userModel')


exports.fetchAllPosts = (req, res, next) => {
    Post.find().then(result => {
        res.status(200).json({ message: 'Success!', posts: result })
    }
    ).catch(err => console.log(err));
};


exports.getPost = (req, res, next) => {
    const postId = req.params.postId;       // its not req.body: we are picking it from URL
    console.log(postId);
    Post.findById(postId).then(result => {
        if (!result) {
            res.status(400).json({ status: 'Not Found!', message: 'No Such Post Found.' })
        } else {
            res.status(200).json({ message: 'Success!', post: result })
        }
    }
    ).catch(err => console.log(err));
};



// --------- Add Validatiion
exports.addPost = (req, res, next) => {

    console.log(req.body);

    const title = req.body.title;
    const description = req.body.content;
    const creatorEmail = req.body.creatorEmail;

    console.log(creatorEmail);
    console.log('--------------------');

    User.findOne({ email: creatorEmail }).then(user => {

        if(user._id.toString() === req.userId){

        const post = new Post({
            title: title,
            description: description,
            creatorEmail: creatorEmail,
            creator: user._id
        });
        console.log('--------------------');
        console.log(post);
        console.log('--------------------');

        post.save()
            .then(result => {
                return User.findById(user._id)
            })
            .then(user => {
                console.log('-------------------');
                user.posts.push(post);
                user.save().then(result2 => {
                    console.log(result2)
                    console.log('Post Created!');
                    res.status(201).json({ message: 'New Post Created Successfully', post: post })
                }).catch(err => console.log(err))

            })
    }else{
        res.status(400).json({ status: 'Operation Restricted', message: 'Invalid Operation!' })
    }}).catch(err => {
        console.log('Error Occured - No user Found');
    });
};



exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;       // its not req.body: we are picking it from URL
    const userId = req.userId;
    // console.log(postId);
    Post.findById(postId).then(post => {
        if(post.creator.toString() === userId){

            Post.findByIdAndDelete(postId).then(result => {
                if (!result) {
                    res.status(400).json({ status: 'Not Found!', message: 'No Such Post Found.' })
                } else {
                    User.findById(userId).then(user => {
                        user.posts.pull(postId);
                        user.save();
                    }); 
                    res.status(200).json({ message: 'Success!', deletedPost: result })
                }
            }
            ).catch(err => console.log(err));

        }else{
            res.status(400).json({ status: 'Operation Restricted', message: 'Invalid Operation!' })
        }
    })
   
};




exports.editPost = (req, res, next) => {

    const postId = req.params.postId;
    Post.findById(postId).then(getResult => {

        console.log('Inside loop')
        if (!getResult) {
            res.status(400).json({ status: 'Not Found!', message: 'No Such Post Found.' })
        } else {
            console.log(getResult.creator.toString() === req.userId);
            console.log(req.userId);
            console.log(getResult.creator.toString());
            if(getResult.creator.toString() === req.userId){
            const updatedTitle = req.body.title;
            const updatedDescription = req.body.content;

            getResult.title = updatedTitle;  
            getResult.description = updatedDescription; 

            getResult.save().then(putResult => {
                //  console.log('inside putResult')
                if (!putResult) {
                    res.status(400).json({ status: 'Operation Failed!', message: 'Operation could not be completed.' })
                } else {
                    res.status(200).json({ status: 'Opeartion Success!', post: putResult })
                }
            });

        }else{
            res.status(400).json({ status: 'Operation Failed!', message: 'Operation could not be completed.' });
        }}
    }).catch(err => {
        console.log(err);
        res.status(400).json({ status: 'Error', message: 'Error processing the request.' })
    });
};

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;       // its not req.body: we are picking it from URL
    // console.log(postId);
    Post.findById(postId).then(result => {
        if (!result) {
            res.status(400).json({ status: 'Not Found!', message: 'No Such Post Found.' })
        } else {
            res.status(200).json({ message: 'Success!', post: result })
        }
    }
    ).catch(err => console.log(err));
};
