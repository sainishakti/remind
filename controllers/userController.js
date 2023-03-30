const db = require('../models')
const response = require('../response/res')
const { Op } = require('sequelize');
const  bcrypt =require("bcrypt");
const nodemailer = require("nodemailer")
const  jwt =require("jsonwebtoken")
var smtpTransport = require('nodemailer-smtp-transport');
const JWT_SECRET_KEY ="Remind@!#$%^"

const Users = db.users
const payment = db.payment
//addUser....................................................................
const addUsers = async (req, res) => {
    try {
        const{firstName,lastName,email,passwords,confirmPassword} = req.body;
        const users = await Users.findOne({where:{email:email}})
        if(users){
            response.Message ="User Already Exists",
            response.success=false,
            response.data=null
            res.status(400).send(response)
        }else{
        if(passwords ===confirmPassword){
            // const salt = await bcrypt.genSalt(10)
            // const newHashPassword = await bcrypt.hash(passwords, salt)
            let info = {
              firstName: firstName,
                lastName: lastName,
                email: email,
                passwords: passwords,
            }
            const usersData = await Users.create(info)
            if(usersData){
            response.Message ="User Add Successfully",
            response.success=true,
            response.data=usersData
            res.status(200).send(response)
            }else{
            response.Message ="User Don't Add",
            response.success=false,
            response.data=null
            res.status(400).send(response)
            }
        }else{
            response.Message ="Password And ConfirmPassword Don't match",
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
 
//login...........................................................................
const loginUser = async (req, res) => {
    try {
        const{email,passwords} = req.body;
        console.log("req.body",req.body);
        let user = await Users.findAll({where: { email: email }});
        console.log("user",user);
    if(user){
        let users = await Users.findAll({
                where: {[Op.and]: [
                    { email:  email},
                    { passwords: passwords}
                  ]}})
                  console.log("users",users);
    if(users && users.length  >0){
        const user = await Users.findAll({where: { email: email }});
        const token = jwt.sign({ userID: email }, "remindof@!@#$%^&", { expiresIn: '5d' })
            response.Message ="Login Successfully",
            response.success=true,
            response.data={user,token}
            res.status(200).send(response)
       }else{
            response.Message ="Email Or Password Is Wrong",
            response.success=false,
            response.data=null
            res.status(400).send(response)
            }
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
 
//addressSave................................................................
const SaveAddress = async (req, res) => {
    try {
        const{firstName,lastName,address1,address2,postalCode,city,state,phoneNumber,id} = req.body;
        const updateAddress = await Users.update({
            firstName: firstName,
            lastName:lastName,
            address1:address1,
            address2:address2,
            postalCode:postalCode,
            city:city,
            state:state,
            phoneNumber:phoneNumber },{where: { id:id }});
            const data = await Users.findOne({where:{id:id}})
            if(updateAddress && updateAddress.length>0){
                response.Message ="User Update  Successfully",
                response.success=true,
                response.data=data
                res.status(200).send(response) 
            }else{
                response.Message ="User Don't Update",
                response.success=false,
                response.data=null
                res.status(200).send(response)
            }
      
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}
//getAdress............................................................
const GetAccount = async (req, res) => {
    try {
        const{id} = req.query;
        let users = await Users.findAll({where: { id: id }});
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
//getaddress.............................................
const GetAddress = async (req, res) => {
  try {
      const{id} = req.query;
      let users = await Users.findAll({where: { id: id }});
      if(users && users.length>0){
          response.Message ="Address Get Successfully",
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
//alladdress.......................................
const AllAddress = async (req, res) => {
  try {
      const{id} = req.query;
      let users = await Users.findAll();
      if(users && users.length>0){
          response.Message ="Address Get Successfully",
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
//ChangePassword........................................
const changePassword = async (req, res) => {
    try{
    const { oldPassword,password, password_confirmation,id} = req.body
    const user = await  Users.findAll({where: { id: id }});
    console.log("user.datavalues.password",user[0].dataValues.passwords);
    //const isMatch = await bcrypt.compare(oldPassword, user[0].dataValues.passwords)
if(oldPassword === user[0].dataValues.passwords){
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        response.Message ="New Password and Confirm New Password doesn't match",
        response.success=false,
        response.data=null
        res.status(400).send(response)
     } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        const data= await Users.update({passwords: newHashPassword},{where: { id:id }});
    if(data && data.length>0){
        response.Message ="Password changed succesfully" ,
        response.success=true,
        response.data="Data"
        res.status(200).send(response)
      
    }else{
        response.Message ="Password Don't Changed" ,
        response.success=false,
        response.data=null
        res.status(400).send(response)
    }
}
    } else {
        response.Message ="All Fields are Required",
        response.success=false,
        response.data=null
        res.status(400).send(response)
    }
  }else{
        response.Message ="Old Password Is Wrong" ,
        response.success=false,
        response.data=null
        res.status(400).send(response)
  }
  }catch(err){
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
  }
}
//Send OTP On Mail
const sendOtpEmail = async (req, res) => {
    const { email,id } = req.body
  var otp = Math.floor(1000 + Math.random() * 9000);
    if (email) {
      const user = await Users.findOne({where:{email:email}})
      if (user) {
     const data = await Users.update({email:email ,otp:otp},{where: { id:id }})
        const transporter = nodemailer.createTransport(smtpTransport({
          host: "smtp-mail.outlook.com", 
          secureConnection: false, 
          port: 587,
          auth: {
              user: "shakti2525@outlook.com",
              pass: "saini@2525"
          }
      }));
      var mailOptions = {
        from:  "shakti2525@outlook.com", 
        to: email, 
        subject: 'Sending Otp Your Mail',
        text: ""+otp, 
         };
    
    // // send mail with defined transport object
     transporter.sendMail(mailOptions, function(error, info){
        if(error){
        console.log(error);
        }else{
        response.Message ="Otp Send Your mail Successfully" ,
        response.success=true,
        response.data="Data"
        res.status(200).send(response)
        }
      })
         }
      else {
        response.Message ="Email doesn't exists" ,
        response.success=false,
        response.data=null
        res.status(400).send(response) 
    }
      }
    else {
        response.Message =  "Email Field is Required",
        response.success=false,
        response.data=null
        res.status(400).send(response)
    }
    }
    //verifyOtp
  const verifyOtp = async (req, res) => {
      const {otp,email } = req.body
      try{
      const user = await Users.findAll({
        where: {[Op.and]: [
            { email:  email},
            { otp: otp}
          ]}})
      if(user){
        const token = jwt.sign({ userID: user._id }, JWT_SECRET_KEY, { expiresIn: '5d' })
        response.Message ="Otp Verify Successfully",
        response.success=true,
        response.data={token:token}
        res.status(200).send(response)
      }else{
        response.Message ="Your Otp  Is Invalid",
        response.success=false,
        response.data=null
        res.status(400).send(response)
      }
    }catch(error){
      response.Message ="Something Went Wrong",
      response.success=false,
      response.data=null
      res.status(400).send(response)
    }
    }
    //setPassword
  const userPasswordReset = async (req, res) => {
      const { password, password_confirmation } = req.body
      try {
        if (password && password_confirmation) {
          if (password !== password_confirmation) {
            response.Message ="New Password and Confirm New Password doesn't match",
            response.success=false,
            response.data=null
            res.status(400).send(response)
       } else {
            const salt = await bcrypt.genSalt(10)
            const newHashPassword = await bcrypt.hash(password, salt)
            await await Users.findAll({
              where: {[Op.and]: [
                  { password:  newHashPassword},
                ]}})
            response.Message ="Password Reset Successfully",
            response.success=false,
            response.data=null
            res.status(200).send(response)
          }
        } else {
            response.Message ="All Fields are Required",
            response.success=false,
            response.data=null
            res.status(200).send(response)
        }
      }catch (error){
            response.Message ="Something Went wrong",
            response.success=false,
            response.data=null
            res.status(200).send(response)
      }
    }
  //editFirstname and last name......................
  const editUser = async (req, res) => {
    const { firstName,lastName,userId} = req.body
    try {
      const data= await Users.update({firstName: firstName,lastName:lastName},{where: { id:userId }});
      let users = await Users.findAll({where: { id: userId }});
      if(data && data.length>0){
        response.Message ="User Updated succesfully" ,
        response.success=true,
        response.data=users
        res.status(200).send(response)
      
    }else{
        response.Message ="User Don't Updated" ,
        response.success=false,
        response.data=null
        res.status(400).send(response)
    }
         
    }catch (error){
          response.Message ="Something Went wrong",
          response.success=false,
          response.data=null
          res.status(200).send(response)
    }
  }
//deleteaddresss
const deleteAdress = async (req, res) => {
  try {
      const {userId} = req.body;
      let users = await Users.destroy({
          where: {
            userId: userId
          }
      })
      if(users === 1){
          response.Message ="Address Delete Successfully",
          response.success=true,
          response.data=null
          res.status(200).send(response)
      }else{
          response.Message ="Not Address Delete",
          response.success=false,
          response.data=null
          res.status(400).send(response)
  }
    } catch (error) {
      console.log(error);
      response.Message ="Something Went wrong",
      response.success=false,
      response.data=null
      res.status(400).send(response)
      
  }
}
//deleteSavePayment
const deletePayment = async (req, res) => {
  try {
      const {userId} = req.body;
      let users = await payment.destroy({where: { userId: userId }});
      if(users ===1){
          response.Message ="payment Delete Successfully",
          response.success=true,
          response.data=null
          res.status(200).send(response)
      }else{
          response.Message ="Not payment Delete",
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
    addUsers,
    loginUser,
    SaveAddress,
    GetAccount,
    changePassword,
    sendOtpEmail,
    verifyOtp,
    userPasswordReset,
    editUser,
    GetAddress,
    deleteAdress,
    deletePayment,
    AllAddress
   }
