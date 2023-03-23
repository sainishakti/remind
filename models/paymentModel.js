
module.exports= (sequelize, DataTypes) => {

    const users = sequelize.define("payment", {
        userId: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        card: {
            type: DataTypes.STRING
        },
        expiration: {
            type: DataTypes.STRING
        },
        cvc: {
            type: DataTypes.STRING
        },
        address1: {
            type: DataTypes.STRING
        },
        address2: {
            type: DataTypes.STRING
        },
        postalCode: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
      
    
    })

    return users

}




