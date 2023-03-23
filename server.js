const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()
app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
// routers
const router = require('./routes/usersRouter.js')
app.use('/api/users', router)

// database.................
require('./models/index.js');



const PORT = process.env.PORT || 3001

//server
const ipAddress = '192.168.1.22'
app.listen(PORT,ipAddress, () => {
    console.log(`server is running on port 'http://${ipAddress}:${PORT}`)
})

