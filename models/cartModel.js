module.exports= (sequelize, DataTypes) => {
  const cart = sequelize.define('cartss',{
        userId: {
            type: DataTypes.STRING
        },
        productId: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        isThisVideoforYourLife: {
            type: DataTypes.STRING
        },
        starFirstName: {
            type: DataTypes.STRING
        },
        starLastName: {
            type: DataTypes.STRING
        },
       
    
    })

    return cart

}




