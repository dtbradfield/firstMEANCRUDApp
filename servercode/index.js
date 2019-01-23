let express = require('express');
let mongoose = require('mongoose');
let bodyparser = require('body-parser');
let cors = require('cors');

let app = express();
const route = require('./route/routes.js');

mongoose.connect('mongodb://localhost:27017/shoppinglist');

mongoose.connection.on('connected', ()=>{
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) =>{
    console.log(err);
});

const PORT = 3000;

app.use(cors());

app.use(bodyparser.json());

app.use('/api', route);

app.get('/', (req, res) => {
    res.send("I am the creator");
});

app.listen(PORT, ()=> {
    console.log('Server started at port: ' + PORT);
});