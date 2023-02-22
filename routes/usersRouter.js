// import controllers review, products
const userController = require('../controllers/userController.js')



// router
const router = require('express').Router()


// use routers
router.post('/addUsers', userController.addUsers)




module.exports = router