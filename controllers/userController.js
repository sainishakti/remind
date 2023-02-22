const db = require('../models')
const response = require('../response/res')

const Users = db.users

const addUsers = async (req, res) => {
  const{ firstName,lastName,email,passwords,confirmPassword} = req.body;
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
}

module.exports = {
    addUsers,
   }
