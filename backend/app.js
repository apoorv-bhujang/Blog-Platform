const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();

//Route Handler
const feedRouter = require('./routes/feedRouter');

const userRouter = require('./routes/userRouter');

const { body } = require('express-validator');


// Parse incoming body
app.use(bodyParser.json());

//Apply cors handling
app.use(cors());

app.use('/feed', feedRouter)
app.use('/member', userRouter)

try {
    mongoose.connect(
        'mongodb+srv://randomboy059:OAlZXsqQq63w7sY9@cluster0.zcujzra.mongodb.net/REST_API?retryWrites=true'
    ).then(result => {
        app.listen(8080);
        console.log('DB Connected!')
    })
} catch (err) {
    console.log(err);
}
