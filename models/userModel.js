module.exports= (sequelize, DataTypes) => {

    const users = sequelize.define("users", {
        firsName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
        },
        passwords: {
            type: DataTypes.STRING
        },
    
    })

    return users

}