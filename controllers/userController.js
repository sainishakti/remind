const db = require('../models')
const response = require('../response/res')
const { Op } = require('sequelize');

const Users = db.users
//addUser....................................................................
const addUsers = async (req, res) => {
    try {
        const{firstName,lastName,email,passwords,confirmPassword} = req.body;
        if(passwords ===confirmPassword){
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
        let user = await Users.findAll({where: { email: email }});
    if(user){
        let users = await Users.findAll({
                where: {[Op.and]: [
                    { email:  email},
                    { passwords: passwords}
                  ]}})
    if(users && users.length  >0){
            response.Message ="Login Successfully",
            response.success=true,
            response.data=users
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
 


module.exports = {
    addUsers,
    loginUser
   }
