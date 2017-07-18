var express =  require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app =  express();

const route = require('./routes/route');
const routepostgres = require('./routes/routepostgres');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/productlist');

//on connection
mongoose.connection.on('connected',function(){
    console.log('connected to database @port 27017');
});

mongoose.connection.on('error',function(err){
    if(err){
        console.log('connected to database');
    }

});

app.use(cors());

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname,'public')))

app.use('/api', route);

app.use('/postgresapi', routepostgres);

app.listen(3001);