module.exports= (sequelize, DataTypes) => {
    const product = sequelize.define('dataProduct',{
          title: {
              type: DataTypes.STRING
          },
          price: {
              type: DataTypes.INTEGER
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
            type : DataTypes.INTEGER
        },
          
        },
         
      
      )
  
      return product
  
  }
  
  
  
  
  