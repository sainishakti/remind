module.exports= (sequelize, DataTypes) => {
    const orders = sequelize.define('orderItem',{
          userId: {
              type: DataTypes.STRING
          },
          quantity: {
              type: DataTypes.INTEGER
          },
          price: {
              type: DataTypes.INTEGER
          },
          subtotal: {
              type: DataTypes.INTEGER
          },
          image: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },

         
      
      })
  
      return orders
  
  }
  
  
  
  
  