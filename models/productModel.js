module.exports= (sequelize, DataTypes) => {
    const product = sequelize.define('productCart',{
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
         
      
      })
  
      return product
  
  }
  
  
  
  
  