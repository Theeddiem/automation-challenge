const express = require('express')
const items = require('./routes/items')
var cors = require('cors')
const path = require('path')
const error = require('./middleware/error')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/items', items)
const pathh = path.join(__dirname + '/public');
app.use(express.static(pathh));
app.use(error)


const PORT = 3000

app.listen(PORT, () => {
  console.log(`Listenning on porst ${PORT}`)
})
