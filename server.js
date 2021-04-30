//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
const PORT = process.env.PORT || 3003;
//___________________
//Database
//___________________
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
//___________________
//Middleware
//___________________
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
//___________________
// Routes
//___________________
const mangaController = require('./controllers/manga.js');
app.use('/mangadb', mangaController);

app.get('/', (req, res) => {
    res.redirect('/mangadb')
  })
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
