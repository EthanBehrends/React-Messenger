const router = require('express').Router()
let Channel = require('../models/channel.model')

router.route('/').get((req,res) => {
    Channel.find()
        .then(channels => res.json(channels))
        .catch(err => {
            res.status(400).json('Error: ' + err)
        })
})

router.route('/new').post((req,res) => {
    const creator = req.body.creator
    const name = req.body.name
    const public = req.body.public

    const newChannel = new Channel({
        creatorName: creator,
        channel: name,
        public: (public ? public : true)
    })

    newChannel.save()
        .then(() => res.json('Channel created.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router