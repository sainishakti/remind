// import controllers review, products
const userController = require('../controllers/userController.js')
const cartController = require('../controllers/cartController')
//authMiddleware...........................................
const {userAuth} = require('../middleware/auth.js')




// router
const router = require('express').Router()


// use routers
router.post('/addUsers', userController.addUsers)
router.post('/UserLogin', userController.loginUser)
router.post('/UserAddressUpdate', userController.SaveAddress)
router.get('/UserAccountGet', userController.GetAccount)
router.post('/ChangePasswords', userController.changePassword)
router.post('/SendOtp', userController.sendOtpEmail)
router.post('/VerifyOtp', userController.sendOtpEmail)
router.post('/resetPassword',userAuth,userController.userPasswordReset)
router.post('/updateUser',userController.editUser)


//cartRouter...............................................
router.post('/addcart',cartController.addCart)
router.post('/savePayment',cartController.savePayment)
router.get('/getPayment',cartController.GetPayment)
router.post('/editPayment',cartController.editPayment)





module.exports = router