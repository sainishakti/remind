module.exports= (sequelize, DataTypes) => {
    const product = sequelize.define('productCartsData',{
          title: {
              type: DataTypes.STRING
          },
          price: {
              type: DataTypes.STRING
          },
          description: {
              type: DataTypes.STRING
          },
          image: {
              type: DataTypes.STRING
          },
          slug: {
            type: DataTypes.STRING
          },
          product: {
            type : DataTypes.STRING
        },
        quantity: {
            type : DataTypes.STRING
        },
          
        },
         
      
      )
  
      return product
  
  }
  
  
  
  
  