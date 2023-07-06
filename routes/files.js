const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(users);
    res.send(users);
});

router.post('/', (req, res) => {

    console.log('ghgghg')
});

router.get('/:id', (req, res) => {
    res.send('THE GET ID ROUTE');
});

module.exports = router;