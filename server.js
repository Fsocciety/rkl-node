const express = require('express');
const db = require('./sqlite/db.js')


const app = express();

app.use(express.json());

const filesRoutes = require('./routes/files.js');

app.use('/files', filesRoutes);


// get request
app.get('/', (req, res) => {
    res.status(200).send('Hello');
});

app.get('/izvestaj', async (req, res) => {
    console.log(req.body)
    const data = await db.read();
    res.status(200).json(data);
})


app.listen(3000, () => console.log("Server started on port http://localhost:3000"));