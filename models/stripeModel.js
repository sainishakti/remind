
module.exports= (sequelize, DataTypes) => {
    const stripe = sequelize.define("payment", {
        userId: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        cardNumber: {
            type: DataTypes.STRING   
        },
        exp_month: {
            type: DataTypes.STRING
        },
        exp_year: {
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
        amount:{
            type: DataTypes.STRING
        },
    
    })

    return stripe

}




