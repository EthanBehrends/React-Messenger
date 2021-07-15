let crypto = require('crypto')

const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req,res) => {
    const username = req.body.username
    const email = req.body.email
    const name = req.body.name
    const hash = req.body.hash
    const salt = req.body.salt

    const newUser = new User({username: username, email: email, name: name, hash: hash, salt: salt})

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: '  + err))
})

function hash(pass, salt) {
    let hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex');
    return (hash)
}

router.route('/login').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    let resData = {
        success: false,
        name: "",
        error: ""
    }

    User.findOne({username: username}).then(uData => {
        if(hash(password, uData.salt) === uData.hash) {
            req.session.username = username;
            resData.success = true;
            resData.name = uData.name;
            res.json(resData)
        }
        else {
            resData.error = 'Incorrect username or password'
            res.json(resData)
        }
    })
    
})

module.exports = router