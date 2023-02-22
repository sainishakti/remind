module.exports = {
    HOST: "10.0.2.2",
    USER: 'root',
    PASSWORD: 'password@123',
    DB: 'remind',
    dialect: 'mysql',
   

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}