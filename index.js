const express = require('express');
const { readFile } = require('fs').promises;
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', async (req, res) => {
    res.send(await readFile('./home.html', 'utf-8'))
});

app.listen(PORT, () => console.log(`App available on http://localhost:${PORT}`));