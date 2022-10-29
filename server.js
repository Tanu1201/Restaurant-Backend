const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 3002;
const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api', routes);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
const {sequelize} = require('sequelize')
// sequelize.sync()