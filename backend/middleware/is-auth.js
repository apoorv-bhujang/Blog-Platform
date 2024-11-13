const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    
    const authHeader = req.get('Authorization');
    
    if(authHeader){
    
        const token = req.get('Authorization').split(' ')[1];
        let decodedToken;

        try{
            decodedToken = jwt.verify(token, 'somelongsecrettoencrypt')
        }catch(err) {
            console.log(err);
            res.status(400).json({ message: 'Invalid User!' });
        }

        if(decodedToken){
            req.userId = decodedToken.userId;
            console.log('userId :' + req.userId);
        }
    }else{
        res.status(400).json({ message: 'Invalid User!' });
    }
    next();

}