const express = require('express');
const bodyParser =require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const RateLimit = require('express-rate-limit');

const limiter = new RateLimit({
    windowMs: 1000 * 60 * 15,
    max: 200,
    delayMs: 0,
});

const Result = require('./Result');
const { formatResponse } =  require('./helpers.js');

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;
const app = express();

mongoose.connect(MONGO_URL)
    .then(() => console.log('connected to the DB'))
    .catch(err => console.error('an error occured during connection to the DB: ', err));


app.enable('trust proxy');

app.use(limiter);
app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.json(
        formatResponse(null, await Result.find(), null),
    );
});
app.post('/', async (req, res) => {
    try {
        const result = await Result.findOne({ username: req.body.username });

        const document = result
            ? await Result.findOneAndUpdate(
                { username: req.body.username },
                req.body,
                { runValidators: true, new: true }, 
            )
            : await new Result(req.body).save();

        res.json(
            formatResponse(
                null,
                document,
                'saved',
            )
        );

        
    } catch (error) {
        res.status(400).json(
            formatResponse(error, null, 'an error occured')
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