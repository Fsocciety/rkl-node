const express = require('express');
const sqlite = require('sqlite3').verbose();
const insert = require('./sqlite/insertData');
const db = new sqlite.Database('./baza.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
});

const usersRoutes = require('./routes/users.js');

const app = express();
app.use(express.json());
app.use('/users', usersRoutes);
// get request
app.get('/', (req, res) => {
    console.log('GET');
    res.send('Homepage');
});


app.listen(3000, () => console.log("Server started"));