const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res) => {
    //find method returns a promise
    User.find() 
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//post request
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const newUser = new User({username}); //newuser created with the instance of User model
    //newuser saves to database
    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;