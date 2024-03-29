const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
//models................................................................
db.users = require('./userModel.js')(sequelize, DataTypes)
db.cart = require('./cartModel.js')(sequelize, DataTypes)
db.payment = require('./paymentModel.js')(sequelize, DataTypes)
db.order = require('./orderModel.js')(sequelize, DataTypes)
db.stripPayment = require('./stripeModel.js')(sequelize, DataTypes)
db.product = require('./productModel.js')(sequelize, DataTypes)


db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})


module.exports = db

