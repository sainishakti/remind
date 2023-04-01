// import controllers review, products
const userController = require('../controllers/userController.js')
const cartController = require('../controllers/cartController')
const paymentController = require('../controllers/stripeController')
const productController = require('../controllers/productcontroller')
//authMiddleware...........................................
const {userAuth} = require('../middleware/auth.js')




// router
const router = require('express').Router()


// use routers
router.post('/addUsers', userController.addUsers)
router.post('/UserLogin', userController.loginUser)
router.post('/UserAddressUpdate', userController.SaveAddress)
router.post('/UserAddressDelete', userController.deleteAdress)
router.get('/UserAccountGet', userController.GetAccount)
router.get('/GetAddress', userController.GetAddress)
router.get('/AllAddress', userController.AllAddress)
router.post('/ChangePasswords', userController.changePassword)
router.post('/SendOtp', userController.sendOtpEmail)
router.post('/VerifyOtp', userController.sendOtpEmail)
router.post('/resetPassword',userAuth,userController.userPasswordReset)
router.post('/updateUser',userController.editUser)


//cartRouter...............................................
router.post('/addcart',cartController.addCart)
router.get('/getCart',cartController.GetCart)
router.post('/editcart',cartController.editCart)


//Payment........................................
router.post('/savePayment',cartController.savePayment)
router.post('/deletePayment',userController.deletePayment)
router.get('/getPayment',cartController.GetPayment)
router.post('/editPayment',cartController.editPayment)
router.post('/order',cartController.order)
router.post('/updateOrder',cartController.editOrder)
router.get('/getOrder',cartController.GetOrder)
router.post('/payment',paymentController.payment)

//product......................
router.post('/addProduct',productController.addProduct)
router.get('/getProduct',productController.GetProduct)
router.post('/deleteProduct',productController.deleteProduct)





module.exports = router