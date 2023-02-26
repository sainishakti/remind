module.exports = {
    HOST:  '127.0.0.1',
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