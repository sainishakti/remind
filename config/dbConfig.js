module.exports = {
    // HOST:   '127.0.0.1',
    // USER: 'root',
    // PASSWORD: 'password@123',
    // DB: 'remind',
    // dialect: 'mysql',
    HOST:   "cb@us-cdbr-east-06.cleardb.net",
    USER: "bb369c3b7e8a64",
    PASSWORD: "8d33d3cb",
    DB: "heroku_fa7e24f6f61ebe3",
    dialect: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}