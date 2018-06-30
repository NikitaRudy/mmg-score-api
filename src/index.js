const express = require('express');
const bodyParser =require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const Result = require('./Result');
const { formatResponse } =  require('./helpers.js');

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;
const app = express();

mongoose.connect(MONGO_URL)
    .then(() => console.log('connected to the DB'))
    .catch(err => console.errror('an error occured during connection to the DB'));

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.json(
        formatResponse(await Result.find(), null),
    );
});
app.post('/', async (req, res) => {
    try {
        const result = await Result.findOne(req.body)
        
        res.json(
            await new Result(req.body).save(),
            'saved',
        );
    } catch (error) {
        res.status(400).json(
            formatResponse({ ...error, code: 400 }, null, 'an error occured')
        );
    }
});

app.all('*', (req, res) => {
    res.json(
        formatResponse(null, null, 'use appropriate endpoints and methods to get/save score')
    );
});

app.listen(PORT, (err) => {
    if (err) console.error('an error occured during the boot: ', err);
    else console.log(`listening on port: ${PORT}`);
});