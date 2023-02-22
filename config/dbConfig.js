module.exports = {
    HOST: '216.24.57.253',
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