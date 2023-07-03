const express = require('express');
const sqlite = require('sqlite3').verbose();
const insert = require('./sqlite/insertData');
const db = new sqlite.Database('./baza.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
});

const app = express();
app.use(express.json());

// get request
app.get('/', (req, res) => {
    console.log(req.query)
    res.status(200).send(req.query)
});

// post request
app.get('/:id', (req, res) => {
    console.log(req.params)
    res.status(200).send(req.params)
});

app.post('/', (req, res) => {
    console.log(insert('ds'));
});

app.listen(3000, () => console.log("Server started"));