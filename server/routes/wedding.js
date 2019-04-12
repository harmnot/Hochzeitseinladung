const express = require('express')
const router= express.Router()
const weddingController = require('../controller/wedding')


router.get('/listWeddingInvitation', weddingController.listWeddingInvitation)





module.exports = routerk