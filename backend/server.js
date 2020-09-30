const express = require('express')
const items = require('./routes/items')
// const history = require("connect-history-api-fallback");
// require('dotenv').config()
var cors = require('cors')
// const path = require('path')



const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/items', items)


// const staticFileMiddleware = express.static(path.join(__dirname + '/vue-client/dist'));

// app.use(staticFileMiddleware);
// app.use(history({
//   disableDotRule: true,
//   verbose: true
// }));
// app.use(staticFileMiddleware);

// app.get('/', function (req, res) {
//   res.render(path.join(__dirname + '/vue-client/dist/index.html'));
// });

// npm run build
// git commit -m "hi"
// git push heroku master
// heroku logs

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Listenning on porst ${PORT}`)
})
