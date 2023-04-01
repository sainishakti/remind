const  jwt =require('jsonwebtoken')
const db = require('../models') 
const Users = db.users
const JWT_SECRET_KEY ="Remind@!#$%^"

module.exports.userAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header......................
      token = authorization.split(' ')[1]

      // Verify Token...............................
      const { userID } = jwt.verify(token, JWT_SECRET_KEY)
      console.log("userId",userID);
      // Get User from Token..........................
      req.users = await Users.findAll({where: { email:userID }})
      console.log("...................................",req.users);
      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

