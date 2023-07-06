const express = require('express');
const usersRoutes = require('./routes/files.js');

const app = express();

app.use(express.json());
app.use('/files', usersRoutes);

// get request
app.get('/', async (req, res) => {
    res.status(200).send('Hello');
});


app.listen(3000, () => console.log("Server started on port http://localhost:3000"));