const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
// routers
const router = require('./routes/usersRouter.js')
app.use('/api/users', router)

// database.................
require('./models/index.js');



const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})