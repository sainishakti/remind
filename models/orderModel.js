module.exports= (sequelize, DataTypes) => {
    const orders = sequelize.define('orderdata',{
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
         
      
      })
  
      return orders
  
  }
  
  
  
  
  