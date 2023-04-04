const { users, product } = require('../models')
const db = require('../models')
const response = require('../response/res')

const carts = db.cart
const orders = db.order
const payment = db.payment
const Users = db.users
const productModel = db.product

//addCart....................................................................
const addCart = async (req, res) => {
    try {
        const{quantity,price,userId,productId,firstName,lastName,email,phoneNumber,isThisVideoforYourLife,starFirstName,starLastName} = req.body;
        let users = await carts.findAll({where: { userId: userId }});
        if(users.length>0){
            response.Message ="Cart Already Add",
            response.success=false,
            response.data=null
            res.status(400).send(response)
        } else{
        let info = {
                userId:userId,
                productId:productId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                quantity:quantity,
                price:price,
                phoneNumber:phoneNumber,
                isThisVideoforYourLife: isThisVideoforYourLife,
                starFirstName:starFirstName,
                starLastName:starLastName
            }
            const usersData = await carts.create(info)
            if(usersData){
            response.Message ="Cart Add Successfully",
            response.success=true,
            response.data=usersData
            res.status(200).send(response)
        }else{
            response.Message ="cart Don't Add",
            response.success=false,
            response.data=null
            res.status(400).send(response)
    }
}
    } catch (error) {
        console.log("err",error);
        response.Message ="Something Went wrong"
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
} 
//savePayment...................................................................
const savePayment = async (req, res) => {
    try {
        const{userId,country,firstName,cvc,lastName,card,expiration,address1,address2,postalCode,city,state,phoneNumber} = req.body;
            let info = {
                userId:userId,
                firstName: firstName,
                lastName: lastName,
                card: card,
                expiration:expiration,
                cvc: cvc,
                address1:address1,
                address2:address2,
                postalCode:postalCode,
                city:city,
                state:state,
                phoneNumber:phoneNumber,
                country:country
            }
            const usersData = await payment.create(info)
        if(usersData){
            response.Message ="Save Payment Successfully",
            response.success=true,
            response.data=usersData
            res.status(200).send(response)
        }else{
            response.Message ="Payment  Don't Add",
            response.success=false,
            response.data=null
            res.status(400).send(response)
    }
    } catch (error) {
        console.log("err",error);
        response.Message ="Something Went wrong"
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
} 
//getpayment........................
const GetPayment = async (req, res) => {
    try {
        const{userId} = req.query;
        let users = await payment.findAll({where: { userId: userId }});
        if(users && users.length>0){
            response.Message ="Data Get Successfully",
            response.success=true,
            response.data=users
            res.status(200).send(response)
        }else{
            response.Message ="Not Found user",
            response.success=false,
            response.data=null
            res.status(400).send(response)
    }
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}
//editpayment..........................
const editPayment = async (req, res) => {
    try {
        const{userId,country,firstName,cvc,lastName,card,expiration,address1,address2,postalCode,city,state,phoneNumber} = req.body;
        const updateAddress = await payment.update({
            firstName: firstName,
            lastName: lastName,
            card: card,
            expiration:expiration,
            cvc: cvc,
            address1:address1,
            address2:address2,
            postalCode:postalCode,
            city:city,
            state:state,
            phoneNumber:phoneNumber,
            country:country},{where: { userId:userId }});
            const data = await payment.findOne({where:{userId:userId}})
            if(updateAddress && updateAddress.length>0){
                response.Message ="payment Update  Successfully",
                response.success=true,
                response.data=data
                res.status(200).send(response) 
            }else{
                response.Message ="payment Don't Update",
                response.success=false,
                response.data=null
                res.status(400).send(response)
            }
      
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}
//Getcart......................
const GetCart = async (req, res) => {
    try {
        const{userId} = req.query;
        let users = await carts.findAll({where: { userId: userId }});
        if(users && users.length>0){
            response.Message ="Data Get Successfully",
            response.success=true,
            response.data=users
            res.status(200).send(response)
        }else{
            response.Message ="Not Found user",
            response.success=false,
            response.data=null
            res.status(400).send(response)
    }
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}
//editCart.......................
const editCart = async (req, res) => {
    try {
        const{userId,productId,firstName,lastName,email,phoneNumber,isThisVideoforYourLife,starFirstName,starLastName} = req.body;
        const updateAddress = await carts.update({
           firstName: firstName,
           productId:productId,
                lastName: lastName,
                email: email,
                phoneNumber:phoneNumber,
                isThisVideoforYourLife: isThisVideoforYourLife,
                starFirstName:starFirstName,
                starLastName:starLastName},{where: { userId:userId }});
            const data = await carts.findOne({where:{userId:userId}})
            if(updateAddress && updateAddress.length>0){
                response.Message ="Cart Update  Successfully",
                response.success=true,
                response.data=data
                res.status(200).send(response) 
            }else{
                response.Message ="Cart Don't Update",
                response.success=false,
                response.data=null
                res.status(400).send(response)
            }
      
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}
//order...................................................
const order = async (req, res) => {
    try {
        const{userId,quantity,price} = req.body;
        const subtotal = quantity*price
            let info = {
                userId:userId,
                quantity: quantity,
                price: price,
                subtotal:subtotal,
            }
            const usersData = await orders.create(info)
            if(usersData){
            response.Message ="Order Add Successfully",
            response.success=true,
            response.data=usersData
            res.status(200).send(response)
        }else{
            response.Message ="Order Don't Add",
            response.success=false,
            response.data=null
            res.status(400).send(response)
    }
    } catch (error) {
        console.log("err",error);
        response.Message ="Something Went wrong"
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
} 
//editorder........................................................
const editOrder= async (req, res) => {
    try {
        const{userId,quantity,price} = req.body;
        const subtotal = quantity*price
        const updateOrder = await orders.update({
                userId:userId,
                quantity: quantity,
                price: price,
                subtotal:subtotal,
            },{where: { userId:userId }});
            const data = await orders.findOne({where:{userId:userId}})
            if(updateOrder && updateOrder.length>0){
                response.Message ="Order Update  Successfully",
                response.success=true,
                response.data=data
                res.status(200).send(response) 
            }else{
                response.Message ="Cart Don't Update",
                response.success=false,
                response.data=null
                res.status(400).send(response)
            }
      
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}
const GetOrder = async (req, res) => {
    try {
        const{userId} = req.query;
        let users = await orders.findAll({where: { userId: userId }});
        if(users && users.length>0){
            response.Message ="Data Get Successfully",
            response.success=true,
            response.data=users
            res.status(200).send(response)
        }else{
            response.Message ="Not Found Data",
            response.success=false,
            response.data=null
            res.status(400).send(response)
    }
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}
//gtuserIdProduct............................................
const GetCartWithProduct = async (req, res) => {
    try {
        const{userId} = req.query;
        let users = await carts.findAll({where: { userId: userId }});
         const productId = users[0].dataValues.productId
         let productData = await productModel.findAll({where: { id: productId }});
        if(users && users.length>0){
            response.Message ="Data Get Successfully",
            response.success=true,
            response.data=[...users,...productData]
            res.status(200).send(response)
        }else{
            response.Message ="Not Found user",
            response.success=false,
            response.data=null
            res.status(400).send(response)
    }
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}
const deleteCart = async (req, res) => {
    try {
        const {userId} = req.body;
        let users = await carts.destroy({where: { userId: userId }});
        if(users){
            response.Message ="Cart Delete Successfully",
            response.success=true,
            response.data=null
            res.status(200).send(response)
        }else{
            response.Message ="Not Cart Delete",
            response.success=false,
            response.data=null
            res.status(400).send(response)
    }
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
  }

module.exports = {
    addCart,
    savePayment,
    GetPayment,
    editPayment,
    GetCart,
    editCart,
    order,
    editOrder,
    GetOrder,
    GetCartWithProduct,
    deleteCart
  
   }
