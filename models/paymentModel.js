
module.exports= (sequelize, DataTypes) => {

    const users = sequelize.define("payment", {
        userId: {
            type: DataTypes.STRING
        },
        ayment_method_details: {
            type: DataTypes.ARRAY,
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        billingAddress: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.STRING
        },
        receipt_url: {
            type: DataTypes.ARRAY
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




